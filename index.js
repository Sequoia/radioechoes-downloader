#!/usr/bin/env node
var download = require('./scraper.js');

var showPagePath = process.argv[2];
var outputDir    = process.argv[3];
var skip         = parseInt(process.argv[4]);
var howmany      = parseInt(process.argv[5]);

download(showPagePath, outputDir, skip, howmany);
