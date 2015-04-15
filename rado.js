#!/usr/bin/env node
var program  = require('commander');
var pkg      = require('./package.json');

program
  .version(pkg.version)
  .usage('<command> <arguments> [options]')
  .command('download <slug>', 'download some shows (by url part or "slug")')
  .command('search <string>', 'search for a show by title or word')
  .on('--help', printHelp)
  .parse(process.argv);

function printHelp(){
  console.log('See help on each command for usage examples for that command');
  console.log('  $ %s help search', program._name);
  console.log('  ~or~');
  console.log('  $ %s search --help', program._name);
}
