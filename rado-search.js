#!/usr/bin/env node
var program  = require('commander');
var _        = require('lodash');
var search   = require('./scraper.js').search;
var Table = require('cli-table');
 
program
  .parse(process.argv);

search(program.args[0])
  .then(printResults);

function printResults(shows){
  var table = new Table({
    head: ['Title', 'Genre', 'eps', 'Slug']
  });
  var longestSlug = 0;

  shows.forEach(function(show){
    longestSlug = Math.max(show.slug.length, longestSlug);
    table.push([ show.title, show.genre, show.episodes, show.slug ]);
  });

  table.options.colWidths = [20,14,5,longestSlug+2];
  console.log(table.toString());
}
