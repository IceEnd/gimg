#!/usr/bin/env node
import program from 'commander';

import PKG from './package.json';

program
  .version(PKG.version)
  .parse(process.argv);
