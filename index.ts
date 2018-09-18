#!/usr/bin/env node
import program from 'commander';

import canvas from './lib/Canvas';
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
  .option('-t, --type <png|jpe?g|svg.gif>', 'File type', /^(png|jpe?g|svg|gif)/i, 'png')
  .action((...args) => {
    const name = args[0];
    const options = args[1];
    canvas(name, options);
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
