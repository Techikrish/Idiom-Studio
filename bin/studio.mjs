#!/usr/bin/env node
import path from 'node:path';
import { parseArgs } from 'node:util';
import { loadFamilies } from '../src/studio/families.mjs';
import { createDesign, writeDesign, validateFamilies, STUDIO_VERSION } from '../src/studio/index.mjs';
import { screenshot } from '../src/studio/shot.mjs';

const HELP = `Idiom Studio ${STUDIO_VERSION} — a design language generator for native iOS and Android.

Usage
  idiom-studio design "<brief>" [options]
  idiom-studio families
  idiom-studio validate

Design options
  --name <name>        Product name used in the spec and theme files
  --out <dir>          Output directory (default: ./studio-out/<name>)
  --mode <mode>        Preview mode: light or dark
  --family <id>        Force a family (editorial, instrument, cinematic, spatial, ritual,
                       playground, luxe, utility, civic, organic)
  --variant <id>       Force a variant
  --accent <id>        Force an accent
  --shot               Render preview.png with headless Chrome
  --json               Print a machine-readable summary
  --quiet              Print only the output directory

Examples
  idiom-studio design "a calm app for tracking sleep and building a bedtime ritual" --name "Dusk"
  idiom-studio design "a dense portfolio app for tracking investments" --name "Ledger" --mode dark
  idiom-studio design "a local guide for hiking trails and nearby places" --name "North" --shot
`;

function fail(message, code = 2) {
  console.error(`idiom-studio: ${message}`);
  process.exit(code);
}

function printFamilies() {
  const families = loadFamilies();
  for (const family of families) {
    console.log(`${family.id.padEnd(11)} ${family.name.padEnd(11)} ${family.density.padEnd(10)} ${family.thesis}`);
    console.log(`            variants: ${family.variants.map((variant) => variant.id).join(', ')}`);
  }
}

function printValidation() {
  const results = validateFamilies();
  for (const result of results) {
    console.log(`${result.id.padEnd(11)} variants ${result.variants}  accents ${result.accents}  contrast ${result.contrast.light.text.ratio} / ${result.contrast.dark.text.ratio}`);
  }
  console.log(`\n${results.length} families validated.`);
}

async function main(argv) {
  if (argv.length === 0 || argv.includes('--help') || argv.includes('-h')) {
    console.log(HELP);
    return;
  }
  const command = argv[0];
  if (command === 'families') {
    printFamilies();
    return;
  }
  if (command === 'validate') {
    printValidation();
    return;
  }
  if (command !== 'design') {
    fail(`unknown command "${command}". Try: studio design "<brief>"`);
  }

  const { values, positionals } = parseArgs({
    args: argv.slice(1),
    allowPositionals: true,
    options: {
      name: { type: 'string' },
      out: { type: 'string' },
      mode: { type: 'string' },
      family: { type: 'string' },
      variant: { type: 'string' },
      accent: { type: 'string' },
      shot: { type: 'boolean', default: false },
      json: { type: 'boolean', default: false },
      quiet: { type: 'boolean', default: false },
      help: { type: 'boolean', short: 'h', default: false },
    },
  });
  if (values.help) {
    console.log(HELP);
    return;
  }
  const brief = positionals.join(' ').trim();
  if (!brief) fail('a brief is required. Example: studio design "a calm app for tracking sleep"');
  if (values.mode && !['light', 'dark'].includes(values.mode)) fail('--mode must be light or dark');

  const options = {
    name: values.name,
    mode: values.mode,
    familyId: values.family,
    variantId: values.variant,
    accentId: values.accent,
    outDir: values.out,
  };
  const result = writeDesign(brief, options);
  let png = null;
  if (values.shot) {
    png = screenshot(path.join(result.outDir, 'preview.html'), path.join(result.outDir, 'preview.png'));
  }

  if (values.json) {
    console.log(
      JSON.stringify(
        {
          out: result.outDir,
          preview: path.join(result.outDir, 'preview.html'),
          screenshot: png,
          direction: {
            family: result.selection.family.id,
            variant: result.selection.variant.id,
            accent: result.selection.accent.id,
            mode: result.selection.mode,
            confidence: result.selection.confidence,
          },
          tokens: path.join(result.outDir, 'tokens.json'),
          ios: path.join(result.outDir, 'ios/Theme.swift'),
          android: path.join(result.outDir, 'android/Theme.kt'),
          contrast: result.tokens.contrast,
        },
        null,
        2,
      ),
    );
    return;
  }
  if (values.quiet) {
    console.log(result.outDir);
    return;
  }

  console.log(`\n  ${result.tokens.appName}  ·  ${result.selection.family.name} / ${result.selection.variant.name}`);
  console.log(`  ${result.selection.accent.name} accent · ${result.selection.mode} mode · ${result.selection.confidence} confidence\n`);
  if (result.selection.signals.length) {
    console.log(`  Matched: ${result.selection.signals.join(', ')}`);
  } else {
    console.log('  No strong category signal; direction is a proposal.');
  }
  if (result.selection.alternatives.length) {
    console.log(`  Alternatives: ${result.selection.alternatives.map((entry) => entry.name).join(', ')}`);
  }
  console.log(`\n  ${result.outDir}`);
  for (const file of result.written) console.log(`    ${file}`);
  if (png) console.log(`    preview.png`);
  console.log('');
}

main(process.argv.slice(2)).catch((error) => {
  if (process.env.STUDIO_DEBUG) console.error(error.stack);
  fail(error.message);
});
