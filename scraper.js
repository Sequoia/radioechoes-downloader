var Promise = require('bluebird');
var cheerio = require('cheerio');
var async = require('async');
var fs = require('fs');
var path = require('path');
var url = require('url');
var ProgressBar = require('progress');
var pad = require('string-padding');
var filesize = require('file-size');
//wrap these so asyncs return promises
var request = Promise.promisifyAll(require('request'));

var baseUrl      = 'http://www.radioechoes.com';
//"series" page. The listing page for the show
var showPagePath = '/the-burkiss-way'; //@todo externalize
var showPageURL  = baseUrl + showPagePath;

// generally better to be explicit
// path.join(__dirname, "mp3s");
var outputPath   = 'mp3s';

//get the HTML for the page
console.log('requesting page...');

request.getAsync(showPageURL)
  .then(getBody)
  .then(getAllLinks)
  .then(downloadLinks)
  .catch(function(e){
    console.error(e.message);
    process.exit(1);
  });

function getBody(args) {
  var body = args[1];
  var $ = cheerio.load(body);
  console.log('got html with title: "' + $('title').text() + '"...');
  return $;
}

function downloadLinks(links){
  console.log('starting mp3 downloads...');
  async.eachSeries(links, writeRemoteMp3);
}

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
      var filename = path.basename(url.parse(mp3Url).pathname);
      var bar;
      //request mp3
      request(mp3Url)
        .on('response',function(res){
          //setup progress bar once we know response length
          var len = parseInt(res.headers['content-length'], 10);
          var hrLen = pad(filesize(len).human({si:true}),10,' ',pad.RIGHT);

          console.log(filename);
          bar = new ProgressBar(hrLen + ' [:bar] :percent :etas', {
            complete: '=',
            incomplete: ' ',
            width: 20,
            total: len
          });
        })
        .on('data',function(chunk){
          bar.tick(chunk.length);
        })
        // more cuteness here
        // path.join(outputPath, filename)
        .pipe(fs.createWriteStream(path.join(outputPath,filename)))
        .on('close',function(){
          callback();
        })
        .on('error',function(e){
          console.log('problem downloading: ' + filename);
          callback(e.message);
        });
        //stream the file directly to disk
  });
}
