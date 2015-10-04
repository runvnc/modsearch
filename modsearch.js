#!/usr/bin/env node
var request = require('request'),
    jsdom = require('jsdom'),
    fs = require("fs"),
    pad = require("pad"),
    chalk = require("chalk"),
    jquery = fs.readFileSync(__dirname+"/jquery.js", "utf-8"); 

var keywords = process.argv.slice(2);
console.log('keywords: ' + keywords);

jsdom.env({ url: 'https://www.npmjs.com/search?q='+keywords,
  src: [jquery], 
  done: function (errors, window) { 
    var $ = window.$; 
    $("li div").each(function () {
      var data = {
        name: $(this).find('.name').text(),
        desc: $(this).find('.description').text(),
        downloads: $(this).find('.quiet:eq(1)').text(),
      }
      data.name = pad(data.name.substr(0,23),23);
      var tokens = data.downloads.split(' ');
      data.downloads = tokens[0];
      data.downloads = pad(5, data.downloads.substr(0,5))+' ';
      data.desc = pad(data.desc.substr(0,48),48);
      console.log(chalk.yellow(data.downloads), 
                  chalk.magenta(data.name), 
                  chalk.white(data.desc));
    }); 
  }
});
