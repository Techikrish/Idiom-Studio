import { rules } from './rules/index.mjs';
import { makeColor, TIER_ORDER, VERSION } from './util.mjs';

const PROTOTYPE_DOWNGRADE = new Set(['fake-data', 'dead-control', 'state-missing']);

const TIER_LABEL = {
  floor: 'FLOOR',
  reflex: 'REFLEX',
  finish: 'FINISH',
};

const SEVERITY = {
  floor: 'error',
  reflex: 'warn',
  finish: 'info',
};

function parseWaivers(file) {
  const fileLevel = new Set();
  const lineLevel = new Map();
  for (let index = 0; index < file.lines.length; index += 1) {
    const line = file.lines[index];
    const match = line.match(/idiom-ignore(-file)?\s+([\w-]+(?:\s*,\s*[\w-]+)*)\s*:\s*(\S.*)/);
    if (!match) continue;
    const [, scope, ids, reason] = match;
    for (const id of ids.split(',').map((value) => value.trim())) {
      if (scope) {
        fileLevel.add(id);
      } else {
        if (!lineLevel.has(id)) lineLevel.set(id, new Map());
        lineLevel.get(id).set(index + 1, reason.trim());
      }
    }
  }
  return { fileLevel, lineLevel };
}

function waiverFor(waivers, id, line) {
  if (waivers.fileLevel.has(id)) {
    return 'file-level waiver';
  }
  const lines = waivers.lineLevel.get(id);
  if (!lines) return null;
  if (lines.has(line)) return lines.get(line);
  if (lines.has(line - 1)) return lines.get(line - 1);
  return null;
}

function platformsInclude(rule, platform) {
  return rule.platforms.includes('both') || rule.platforms.includes(platform);
}

function finalize(rule, raw, fallbackFile, options) {
  const file = raw.file ?? fallbackFile;
  if (!file) return null;
  let tier = rule.tier;
  let downgraded = false;
  if (options.mode === 'prototype' && PROTOTYPE_DOWNGRADE.has(rule.id)) {
    tier = 'reflex';
    downgraded = true;
  }
  const confidence = raw.confidence ?? rule.confidence ?? 'likely';
  const waiver = waiverFor(file.waivers, rule.id, raw.line);
  return {
    id: rule.id,
    tier,
    originalTier: rule.tier,
    severity: SEVERITY[tier],
    confidence,
    title: rule.title,
    why: rule.why,
    fix: raw.fix ?? rule.fix,
    message: raw.message || rule.title,
    file: file.rel,
    line: raw.line,
    column: raw.column,
    snippet: raw.snippet,
    waived: Boolean(waiver),
    waiverReason: waiver,
    downgraded,
  };
}

export function runLint(project, options = {}) {
  const mode = options.mode ?? project.mode ?? 'release';
  const context = { project, mode };
  const findings = [];

  for (const file of project.files) {
    file.waivers = parseWaivers(file);
  }

  for (const rule of rules) {
    if (rule.scope === 'project') {
      if (!rule.platforms.includes('both') && !project.files.some((file) => platformsInclude(rule, file.platform))) {
        continue;
      }
      const results = rule.detectProject(context) ?? [];
      for (const raw of results) {
        const result = finalize(rule, raw, null, { mode });
        if (result) findings.push(result);
      }
      continue;
    }

    for (const file of project.files) {
      if (!platformsInclude(rule, file.platform)) continue;
      if (file.test && !options.includeTests) continue;
      const results = rule.detect({ ...context, file }) ?? [];
      for (const raw of results) {
        const result = finalize(rule, raw, file, { mode });
        if (result) findings.push(result);
      }
    }
  }

  const seen = new Set();
  const unique = [];
  for (const item of findings) {
    const key = `${item.id}:${item.file}:${item.line}`;
    if (seen.has(key)) continue;
    seen.add(key);
    unique.push(item);
  }

  unique.sort((a, b) => {
    const tier = TIER_ORDER[a.tier] - TIER_ORDER[b.tier];
    if (tier !== 0) return tier;
    const file = a.file.localeCompare(b.file);
    if (file !== 0) return file;
    return a.line - b.line;
  });

  const summary = {
    floor: unique.filter((item) => item.tier === 'floor').length,
    reflex: unique.filter((item) => item.tier === 'reflex').length,
    finish: unique.filter((item) => item.tier === 'finish').length,
    waived: unique.filter((item) => item.waived).length,
    total: unique.length,
  };

  const blocking = unique.filter(
    (item) =>
      !item.waived &&
      item.tier === 'floor' &&
      (options.strict || item.confidence === 'certain'),
  );
  const advisory = unique.filter(
    (item) => !item.waived && item.tier === 'floor' && item.confidence !== 'certain',
  );

  return {
    version: VERSION,
    mode,
    root: project.root,
    files: project.files.length,
    platformCounts: project.platformCounts,
    strict: Boolean(options.strict),
    findings: unique,
    summary: {
      ...summary,
      blocking: blocking.length,
      advisory: advisory.length,
    },
    gate: blocking.length === 0 ? 'pass' : 'fail',
  };
}

export function formatLint(result, options = {}) {
  const color = makeColor();
  const lines = [];
  const { summary } = result;

  lines.push(
    `${color.bold(`Idiom ${result.version}`)} ${color.dim('·')} ${result.mode} ${color.dim('·')} ${
      result.files
    } files ${color.dim(`(${result.platformCounts.ios} iOS, ${result.platformCounts.android} Android)`)}`,
  );

  if (result.findings.length === 0) {
    lines.push('');
    lines.push(color.green('No findings. The floor is clear.'));
    return lines.join('\n');
  }

  for (const tier of ['floor', 'reflex', 'finish']) {
    const group = result.findings.filter((item) => item.tier === tier);
    if (group.length === 0) continue;
    lines.push('');
    lines.push(color.bold(TIER_LABEL[tier]));
    for (const item of group) {
      const label = item.waived ? color.gray('WAIVED') : item.confidence === 'certain' ? 'CERTAIN' : 'LIKELY';
      lines.push(
        `  ${color.dim(label.padEnd(7))} ${color.bold(item.id)}  ${color.cyan(`${item.file}:${item.line}`)}`,
      );
      if (item.snippet) lines.push(`          ${color.dim(item.snippet)}`);
      lines.push(`          ${item.message}`);
      if (item.fix) lines.push(`          ${color.dim(`fix: ${item.fix}`)}`);
      if (options.explain && item.why) lines.push(`          ${color.dim(`why: ${item.why}`)}`);
      if (item.waived) lines.push(`          ${color.gray(`waived: ${item.waiverReason}`)}`);
      if (item.downgraded) lines.push(`          ${color.gray('downgraded in prototype mode')}`);
    }
  }

  lines.push('');
  lines.push(
    `Summary: ${summary.floor} floor · ${summary.reflex} reflex · ${summary.finish} finish · ${summary.waived} waived`,
  );
  if (result.gate === 'pass') {
    const advisory =
      summary.advisory > 0 ? color.yellow(` (${summary.advisory} advisory)`) : '';
    lines.push(`${color.green('Gate: PASS')}${advisory}`);
  } else {
    lines.push(
      `${color.red('Gate: FAIL')} ${color.dim(`— ${summary.blocking} blocking finding${
        summary.blocking === 1 ? '' : 's'
      }`)}`,
    );
  }

  return lines.join('\n');
}
