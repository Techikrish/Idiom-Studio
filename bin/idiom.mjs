#!/usr/bin/env node
import { main } from '../src/cli.mjs';

main(process.argv.slice(2)).catch((error) => {
  console.error(`idiom: ${error.message}`);
  if (process.env.IDIOM_DEBUG) console.error(error.stack);
  process.exit(2);
});
