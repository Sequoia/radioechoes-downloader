#!/usr/bin/env node
var minimist = require('minimist');
var inquirer = require('inquirer');
var superenv = require('superenv');
var path     = require('path-extra');
var _        = require('lodash');
var download = require('./scraper.js');

var opts = {};

opts.alias = {
  out   : 'o',
  skip  : 's',
  get   : 'n'
};

//must merge defaults AFTER reading .rc file
var defaults = {
  out   : '.'
};

var argv = _.defaults(
  minimist(process.argv.slice(2), opts),
  superenv('rado'),
  defaults
);

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

//path loaded from .rc file not automatically expanded
argv.out = expandTilde(argv.out);

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

function expandTilde(pathStr){
  return pathStr.replace(/^~/, path.homedir());
}

