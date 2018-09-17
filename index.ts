#!/usr/bin/env node
import program from 'commander';

import PKG from './package.json';

program
  .version(PKG.version);

program
  .command('create <name>')
  .description('Generate image')
  .usage('[options] <file ...>')
  .option('-s, --size <size>', 'Image size', /^d+xd+$/i, '500x500')
  .option('-t, --text <text>', 'Text')
  .option('-o, --out <path>', 'Out file path')
  .action((...args) => {
    console.log(args);
  });

program
  .command('help')
  .description('Print this help')
  .action(() => {
      program.outputHelp();
  })
  .parse(process.argv);

program
  .parse(process.argv);

if (process.argv.length === 2) {
  program.outputHelp();
}
