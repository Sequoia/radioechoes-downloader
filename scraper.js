var Promise = require('bluebird');
var cheerio = require('cheerio');
var async = require('async');
var fs = require('fs');
var url = require('url');
//wrap these so asyncs return promises
var request = Promise.promisifyAll(require('request'));

var baseUrl      = 'http://www.radioechoes.com';
var showPagePath = '/the-burkiss-way'; //@todo externalize
var showPageURL  = baseUrl + showPagePath;
var outputPath   = 'mp3s';

//get the HTML for the page
console.log('requesting page...');
request.getAsync(showPageURL)
  .then(function(args){
    var body = args[1]
    var $ = cheerio.load(body);
    console.log('got html with title: "' + $('title').text() + '"...');
    return $;
  })
  .then(getAllLinks)
  .then(function(links){
    console.log('starting mp3 downloads...');
    async.eachLimit(links, 2, writeRemoteMp3);
  })
  .catch(function(e){
    console.error(e.message);
    process.exit(1);
  });

//get all the download links on a page
//@param Cheerio object. jquery-like $ object with document already loaded
//@return Array of mp3 addresses
function getAllLinks($){
  console.log('getting links from html...');
  var links = [];
  $('div.downloadMP3 > a.highslide').each(function(i, elem){
    links.push($(this).attr('href'));
  });
  return links;
}
//write one mp3 to disk
//@param String url of downloadPage
//@param Function callback to call when completed
function writeRemoteMp3(downloadPageUrl, callback){
  //request the actual download page
  //console.log('requesting download page: ' + downloadPageUrl);
  request.getAsync(baseUrl + downloadPageUrl)
    .then(function(args){
      var $ = cheerio.load(args[1]); //load body into cheerio
      var mp3Url = $('[href$="mp3"]').attr('href');
      var filename = url.parse(mp3Url).pathname.split('/').pop();
      //request mp3
      request(mp3Url)
        .pipe(fs.createWriteStream(outputPath + '/' + filename))
        .on('close',function(){
          console.log('DOWNLOADED: ' + filename);
          callback();
        })
        .on('error',function(e){
          console.log('problem downloading: ' + filename);
          callback(e.message);
        });
  });
}
