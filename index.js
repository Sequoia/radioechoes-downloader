#!/usr/bin/env node
var minimist = require('minimist');
var download = require('./scraper.js');

var argv = minimist(process.argv.slice(2));

var showPagePath = argv._[0]; //first unnamed argument
var outputDir    = argv.out;
var skip         = parseInt(argv.skip);
var howmany      = parseInt(argv.get);

download(showPagePath, outputDir, skip, howmany);
