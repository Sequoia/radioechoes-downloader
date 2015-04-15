#!/usr/bin/env node
var program  = require('commander');
var inquirer = require('inquirer');
var superenv = require('superenv');
var path     = require('path-extra');
var _        = require('lodash');
var download = require('./scraper.js').download;

program
  .option('-o, --out <path>','where to create show directory')
  .option('-s, --skip <n>','how many episodes to skip (offset)')
  .option('-n, --get <n>','how many episodes to download')
  .usage('<slug> [options]')
  .description('Search for shows by title')
  .on('--help', printHelp)
  .parse(process.argv);

//must merge defaults AFTER reading .rc file
var defaults = {
  out   : '.'
};

var argv = _.defaults(
  program,
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

//prompt if any prompts are present
if(prompts.length){
  inquirer.prompt(prompts,function(answers){
    runDownload(_.assign(argv,answers));
  });
}else{
  runDownload(argv);
}

function runDownload(argv){
  var showPagePath = argv.args[0]; //first unnamed argument
  //path loaded from .rc file not automatically expanded
  var outputDir    = expandTilde(argv.out);
  var skip         = parseInt(argv.skip);
  var howmany      = parseInt(argv.get);

  download(showPagePath, outputDir, skip, howmany);
}

function expandTilde(pathStr){
  return pathStr.replace(/^~/, path.homedir());
}

function printHelp(){
  var cmd = program._name.replace('-',' ');
  console.log('This command identifies a show by it\'s "slug", or the last part of the show page\'s URL');
  console.log('For example, to download shows listed on http://www.radioechoes.com/alka-seltzer-time, use:');
  console.log('  $ %s alka-seltzer-time', cmd);
  console.log('');
  console.log('Examples');
  console.log('');
  console.log(' Download Space Patrol, prompt for how many to d/l & skip');
  console.log('  $ %s space-patrol', cmd);
  console.log(' Download the 11th episode of The Burkiss Way');
  console.log('  $ %s the-burkiss-way -s 10 -n 1', cmd);
  console.log(' Download the first three episodes of The Six Shooter to your home directory');
  console.log('  $ %s the-burkiss-way --skip 0 --get 3 --out ~', cmd);
}
