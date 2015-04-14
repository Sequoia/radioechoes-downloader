#!/usr/bin/env node
var minimist = require('minimist');
var inquirer = require('inquirer');
var _        = require('lodash');
var download = require('./scraper.js');

var opts = {};

opts.alias = {
  out   : 'o',
  skip  : 's',
  get   : 'n'
};

opts.default = {
  out   : '.'
};

var argv = minimist(process.argv.slice(2), opts);

var prompts = [];

//ask for # to download & how many to skip if they didn't specify 
if(typeof argv.skip === 'undefined'){
  prompts.push({
    type: 'input',
    name: 'skip',
    message: 'How many episodes should be skipped? (0 for "start with ep1")',
    default: 0
  });
}

if(typeof argv.get === 'undefined'){
  prompts.push({
    type: 'input',
    name: 'get',
    message: 'How many should be downloaded?',
    default: 10
  });
}

//prompt if any prompts are present
if(prompts.length){
  inquirer.prompt(prompts,function(answers){
    runDownload(_.assign(argv,answers));
  });
}else{
  runDownload(argv);
}

function runDownload(argv){
  var showPagePath = argv._[0]; //first unnamed argument
  var outputDir    = argv.out;
  var skip         = parseInt(argv.skip);
  var howmany      = parseInt(argv.get);

  download(showPagePath, outputDir, skip, howmany);
}
