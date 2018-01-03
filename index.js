var request = require('request');
var cheerio = require('cheerio');
var async = require('async');

// FIRST EXAMPLE
// request('http://www.visitseattle.org/', function(error, response, data){
//   // console.log(data);
//   var $ = cheerio.load(data);
//   // console.log($('h2').text());
//   // console.log($('.text-medium-small').text());
//
//   var neighborhoods = $('.text-medium-small').map(function(index, element){
//     return {
//       name: $(element).text(),
//       link: $(element).closest('a').attr('href')
//     }
//   }).get();
//   console.log(neighborhoods);
// });

// ASYNC EG
// function fn1(callback){
//     console.log(1);
//     // request('http://www.joejohnson.com', function(error, response, data){
//     //   callback(null, data);
//     // });
//     callback(null, "first");
// }
// function fn2(callback){
//     console.log(2);
//     callback(null, "second");
// }
// function fn3(callback){
//     console.log(3);
//     callback(null, "third");
// }
//
// // async.series([fn1, fn2, fn3], function(err, results){
// async.series([fn3, fn2, fn1], function(err, results){
//   console.log("DONE");
//   console.log(results);
//   console.log(err);
// });

// EXAMPLE 3
// function fn1(callback){
//   setTimeout(function(){
//     console.log(1);
//   callback(null, "first");
// }, 5000);
// }
//
// function fn2(callback){
//   setTimeout(function(){
//     console.log(2);
//   callback(null, "second");
// }, 1000);
// }
//
// function fn3(callback){
//   setTimeout(function(){
//     console.log(3);
//   callback(null, "third");
// }, 10000);
// }
//
// // async.parallel([fn1, fn2, fn3], function(err, results){
// async.series([fn1, fn2, fn3], function(err, results){
//   console.log("Done!");
//   console.log(results);
// })

// EXAMPLE 4 - WATERFALL
// function fn1(callback){
//   var initial = 55;
//   callback(null, initial);
// }
//
// function fn2(num1, callback){
//   var num1 = num1 + 5;
//   callback(null, num1);
// }
//
// function fn3(num1, callback){
//   num1 = num1 + 40;
//   callback(null, num1);
// }
//
// async.waterfall([fn1, fn2, fn3], function(err, results){
//   console.log('Done');
//   console.log(results); //Expect 100.
// });

// EXAMPLE 5 - CONCAT
var urlsToGet = ["https://www.reddit.com/search.json?q=politics",
                 "https://www.reddit.com/search.json?q=jokes",
                 "https://www.reddit.com/search.json?q=youtubehaiku"];

var getFirstTitle = function(url, callback){
  request(url, function(err, response, data){
    var firstTitle = JSON.parse(data).data.children[0].data.title;
    callback(null, firstTitle);
  });
}

async.concat(urlsToGet, getFirstTitle, function(err, results){
  console.log('Done');
  console.log(results);
})
