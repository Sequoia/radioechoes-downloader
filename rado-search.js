#!/usr/bin/env node
var program  = require('commander');
var _        = require('lodash');
var search   = require('./scraper.js').search;
var chalk    = require('chalk');

program
  .parse(process.argv);

search(program.args[0])
  .then(function(shows){
    shows.forEach(function(show){
      console.log(chalk.blue.bold(show.title));
      console.log('slug: %s', show.slug);
      console.log('genre: %s', show.genre);
      console.log('number of episodes available: %s', show.episodes);
    });
  });
