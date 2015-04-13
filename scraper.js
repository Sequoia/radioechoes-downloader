var Promise = require('bluebird');
var cheerio = require('cheerio');
var async = require('async');
var fs = require('fs');
var url = require('url');
var path = require('path');
//wrap these so asyncs return promises
var request = Promise.promisifyAll(require('request'));

var baseUrl      = 'http://www.radioechoes.com';
var outputPath   = 'mp3s';

module.exports = download;

/**
 * gets listing of MP3s & downloads them
 * @param String showPageSlug
 */
function download(showPagePath){
  //get the HTML for the page
  console.log('requesting page...');
  request.getAsync(url.resolve(baseUrl,showPagePath))
    .then(function(args){
      var body = args[1];
      var $ = cheerio.load(body);
      console.log('got html with title: "' + $('title').text() + '"...');
      return $;
    })
    .then(getAllLinks)
    .then(function(links){
      console.log('starting mp3 downloads...');
      async.eachSeries(links, writeRemoteMp3);
    })
    .catch(function(e){
      console.error(e.message);
      process.exit(1);
    });
}

/**
 * get all the download links on a page
 * @param Cheerio object. jquery-like $ object with document already loaded
 * @return Array of mp3 addresses
 */
function getAllLinks($){
  console.log('getting links from html...');
  var links = [];
  $('div.downloadMP3 > a.highslide').each(function(i, elem){
    links.push($(this).attr('href'));
  });
  return links;
}

/**
 * write one mp3 to disk
 * @param String url of downloadPage
 * @param Function callback to call when completed
 *
 * We request the page for the actual mp3 url rather than use query.dl_file
 * because it's on AWS which makes me think the basepath could change.
 * Trades speed for omre change-tolerance
 */
function writeRemoteMp3(downloadPageUrl, callback){
  //request the actual download page
  request.getAsync(baseUrl + downloadPageUrl)
    .then(function(args){
      var $ = cheerio.load(args[1]); //load body into cheerio
      var mp3Url = $('[href$="mp3"]').attr('href');
      var filename = path.basename(mp3Url);
      console.log('downloading ' + filename);
      //request mp3 (DIRECT CALL TO `request` NOT PROMISIFIED (for streaming)
      request(mp3Url)
        //stream the file directly to disk
        .pipe(fs.createWriteStream(path.join(outputPath, filename)))
        .on('close',function(){
          callback();
        })
        .on('error',function(e){
          console.error('problem downloading: ' + filename);
          callback(e.message);
        });
  });
}
