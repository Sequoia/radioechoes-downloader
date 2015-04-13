var download = require('./scraper.js');

//first arg: 
var showPagePath = process.argv[2];
//second arg:
var outputDir    = process.argv[3];

download(showPagePath, outputDir);
