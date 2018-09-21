#!/usr/bin/env node
import program from 'commander';

import Canvas from './lib/Canvas';
import PKG from './package.json';

program
  .version(PKG.version)
  .parse(process.argv);

program
  .command('create <name>')
  .description('Generate image')
  .usage('[options] <file ...>')
  .option('-s, --size <size>', 'Image size', /^\d+x\d+$/i, '200x200')
  .option('-t, --text <text>', 'Text')
  .option('-o, --out <path>', 'Out path')
  .option('-t, --type <png|jpe?g|svg|gif>', 'File type', /^(png|jpe?g|svg|gif)/i, 'png')
  .option('-bg, --background <color>', 'Background color', '#000000')
  .option('-c, --color <color>', 'Font color', '#FFFFFF')
  .action((name, cmd) => {
    const { size, text, out, type, background, color } = cmd;
    const canvas = new Canvas(name, {
      size,
      text,
      out,
      type,
      background,
      color,
    });
    canvas.drawImage();
  })
  .parse(process.argv);

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
