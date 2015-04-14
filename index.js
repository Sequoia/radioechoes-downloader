#!/usr/bin/env node
var minimist = require('minimist');
var download = require('./scraper.js');

var opts = {};

opts.alias = {
  out   : 'o',
  skip  : 's',
  get   : 'n'
};

opts.default = {
  out   : '.',
  skip  : 0,
  get   : 10
};

var argv = minimist(process.argv.slice(2), opts);

var showPagePath = argv._[0]; //first unnamed argument
var outputDir    = argv.out;
var skip         = parseInt(argv.skip);
var howmany      = parseInt(argv.get);

download(showPagePath, outputDir, skip, howmany);
