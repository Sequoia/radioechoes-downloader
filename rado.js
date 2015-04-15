#!/usr/bin/env node
var program  = require('commander');

program
  .command('download <slug>', 'download some shows (by url part or "slug")')
  .command('search [string]', 'search for a show by title or word')
  .parse(process.argv);
