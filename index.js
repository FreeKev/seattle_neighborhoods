var request = require('request');
var cheerio = require('cheerio');

request('http://www.visitseattle.org/', function(error, response, data){
  // console.log(data);
  var $ = cheerio.load(data);
  // console.log($('h2').text());
  // console.log($('.text-medium-small').text());

  var neighborhoods = $('.text-medium-small').map(function(index, element){
    return {
      name: $(element).text(),
      link: $(element).closest('a').attr('href')
    }
  }).get();
  console.log(neighborhoods);
});
