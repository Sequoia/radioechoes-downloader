#!/usr/bin/env node
var program  = require('commander');

program
  .command('download <name>', 'download some shows')
  .parse(process.argv);
