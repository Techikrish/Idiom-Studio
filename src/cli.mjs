import fs from 'node:fs';
import path from 'node:path';
import {
  appendLedger,
  directionCard,
  formatMaterialList,
  loadMaterials,
  readLedger,
  resolveDirection,
} from './direction.mjs';
import { formatLint, runLint } from './lint.mjs';
import { scanProject } from './scan.mjs';
import { auditStates, formatStates } from './states.mjs';
import { makeColor, VERSION } from './util.mjs';

const VALUE_FLAGS = new Set([
  'mode',
  'name',
  'category',
  'adjectives',
  'seed',
  'platform',
]);

const BOOLEAN_FLAGS = new Set([
  'json',
  'strict',
  'include-tests',
  'explain',
  'ci',
  'save',
  'list',
  'force',
  'help',
  'version',
  'no-ledger',
]);

function parseArgs(args) {
  const flags = {};
  const positionals = [];
  for (let index = 0; index < args.length; index += 1) {
    const argument = args[index];
    if (argument === '--') {
      positionals.push(...args.slice(index + 1));
      break;
    }
    if (argument === '-h') {
      flags.help = true;
      continue;
    }
    if (argument === '-v') {
      flags.version = true;
      continue;
    }
    if (argument.startsWith('--')) {
      const body = argument.slice(2);
      const equals = body.indexOf('=');
      if (equals !== -1) {
        flags[body.slice(0, equals)] = body.slice(equals + 1);
        continue;
      }
      if (BOOLEAN_FLAGS.has(body)) {
        flags[body] = true;
        continue;
      }
      if (VALUE_FLAGS.has(body)) {
        const next = args[index + 1];
        if (next === undefined || next.startsWith('--')) {
          throw new Error(`--${body} needs a value`);
        }
        flags[body] = next;
        index += 1;
        continue;
      }
      throw new Error(`unknown option --${body}`);
    }
    positionals.push(argument);
  }
  return { flags, positionals };
}

function modeOf(flags, fallback = 'release') {
  const mode = flags.mode ?? fallback;
  if (!['release', 'prototype'].includes(mode)) {
    throw new Error('--mode must be release or prototype');
  }
  return mode;
}

function lintCommand(args) {
  const { flags, positionals } = parseArgs(args);
  if (flags.help) {
    console.log(`Usage: idiom lint [path] [options]

Options:
  --mode release|prototype   Gate strictness (default: release)
  --strict                   Fail on likely Floor findings as well as certain ones
  --include-tests            Scan test sources too
  --explain                  Show the rationale for each finding
  --json                     Machine-readable output
  --ci                       Emit GitHub annotations

Exit codes: 0 pass, 1 blocking findings, 2 error.`);
    return;
  }
  const target = positionals[0] ?? '.';
  const mode = modeOf(flags);
  const project = scanProject(target, { mode });
  const result = runLint(project, {
    mode,
    strict: Boolean(flags.strict),
    includeTests: Boolean(flags['include-tests']),
  });

  if (flags.json) {
    console.log(JSON.stringify(result, null, 2));
  } else if (flags.ci) {
    const annotations = result.findings
      .filter((finding) => !finding.waived)
      .map((finding) => {
        const level = finding.tier === 'floor' ? 'error' : finding.tier === 'reflex' ? 'warning' : 'notice';
        const message = finding.message.replace(/%/g, '%25').replace(/\r/g, '%0D').replace(/\n/g, '%0A');
        return `::${level} file=${finding.file},line=${finding.line},title=${finding.id}::${message}`;
      });
    if (annotations.length > 0) console.log(annotations.join('\n'));
    console.log(
      `Idiom: ${result.summary.floor} floor, ${result.summary.reflex} reflex, ${result.summary.finish} finish; gate ${result.gate}.`,
    );
  } else {
    console.log(formatLint(result, { explain: Boolean(flags.explain) }));
  }

  if (result.gate === 'fail') process.exitCode = 1;
}

function statesCommand(args) {
  const { flags, positionals } = parseArgs(args);
  if (flags.help) {
    console.log(`Usage: idiom states [path] [options]

Options:
  --mode release|prototype   Prototype mode downgrades honesty findings
  --json                     Machine-readable output
  --ci                       Exit 1 when a data screen is missing core states`);
    return;
  }
  const target = positionals[0] ?? '.';
  const mode = modeOf(flags);
  const project = scanProject(target, { mode });
  const lint = runLint(project, { mode });
  const result = auditStates(project, { lint, mode });

  if (flags.json) console.log(JSON.stringify(result, null, 2));
  else console.log(formatStates(result));

  if (flags.ci && result.summary.incomplete > 0) process.exitCode = 1;
}

function directionCommand(args) {
  const { flags } = parseArgs(args);
  if (flags.help) {
    console.log(`Usage: idiom direction [options]

Options:
  --name <text>          App name, used as part of the seed
  --category <text>      Product category (finance, wellness, travel, ...)
  --adjectives <text>    Three adjectives, comma or space separated
  --seed <text>          Reproducible seed (default: timestamp)
  --platform ios|android|both
  --list                 List the six materials
  --json                 Machine-readable output
  --save                 Append the choice to .idiom/ledger.json
  --no-ledger            Ignore the local anti-convergence ledger`);
    return;
  }

  const materials = loadMaterials();
  if (flags.list) {
    console.log(formatMaterialList(materials));
    return;
  }

  const root = process.cwd();
  const ledger = flags['no-ledger'] ? [] : readLedger(root);
  const seed = flags.seed ?? Date.now().toString(36);
  const direction = resolveDirection({
    materials,
    name: flags.name ?? 'Untitled',
    category: flags.category ?? '',
    adjectives: flags.adjectives ?? '',
    seed,
    platform: flags.platform ?? 'both',
    ledger,
  });

  if (flags.json) console.log(JSON.stringify(direction, null, 2));
  else console.log(directionCard(direction));

  if (flags.save) {
    const ledgerPath = appendLedger(root, direction);
    console.error(`Saved direction to ${ledgerPath}`);
  }
}

function initCommand(args) {
  const { flags, positionals } = parseArgs(args);
  if (flags.help) {
    console.log('Usage: idiom init [path] [--force]');
    return;
  }
  const target = path.resolve(positionals[0] ?? '.');
  const directory = path.join(target, '.idiom');
  fs.mkdirSync(directory, { recursive: true });

  const configPath = path.join(directory, 'config.json');
  if (!fs.existsSync(configPath) || flags.force) {
    fs.writeFileSync(
      configPath,
      `${JSON.stringify({ mode: 'release', platforms: ['ios', 'android'] }, null, 2)}\n`,
    );
  }

  const decisionsPath = path.join(directory, 'decisions.md');
  if (!fs.existsSync(decisionsPath) || flags.force) {
    fs.writeFileSync(
      decisionsPath,
      `# Design decisions

## Direction

Pending. Run:

    idiom direction --name "App" --category "..." --adjectives "..." --save

Record the chosen material, the three adjectives, and one thing this app will never do.

## Screens

| Screen | Job | States | Notes |
|---|---|---|---|
|  |  | loading / empty / error / offline / permission |  |

## Waivers

Waivers live next to the code and require a reason:

    // idiom-ignore rule-id: why this exception is correct

List every waiver here so review can see them in one place.
`,
    );
  }

  console.log(`Initialized ${directory}`);
  console.log('Next: idiom direction --name "App" --save');
}

function help() {
  const color = makeColor();
  console.log(`${color.bold(`Idiom ${VERSION}`)} — native design language and anti-slop gate.

${color.bold('Commands')}
  idiom lint [path]        Platform, accessibility, honesty, and default-pattern checks
  idiom states [path]      State coverage across screens
  idiom direction         Choose a seeded visual direction
  idiom init [path]       Create .idiom/config.json and decisions.md
  idiom help              This message

${color.bold('Examples')}
  idiom lint                         Lint the current project
  idiom lint app --mode prototype    Relax honesty rules while prototyping
  idiom lint app --strict --ci       Fail on likely Floor findings in CI
  idiom states app                   Show loading / empty / error coverage
  idiom direction --name "Ledger" --category finance --adjectives precise,dense,calm --save
  idiom direction --list             List the six materials

${color.bold('Exit codes')}
  0 pass · 1 blocking findings · 2 error

${color.dim('Docs: SKILL.md · references/ · README.md')}`);
}

export async function main(argv) {
  const [command, ...rest] = argv;
  if (!command || command === 'help' || command === '--help' || command === '-h') {
    help();
    return;
  }
  if (command === 'version' || command === '--version' || command === '-v') {
    console.log(VERSION);
    return;
  }

  switch (command) {
    case 'lint':
      lintCommand(rest);
      break;
    case 'states':
      statesCommand(rest);
      break;
    case 'direction':
      directionCommand(rest);
      break;
    case 'init':
      initCommand(rest);
      break;
    default:
      throw new Error(`unknown command "${command}". Run: idiom help`);
  }
}
