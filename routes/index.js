const routes = require('express').Router();
const request = require('request');
const cheerio = require('cheerio');
const Article = require('./../models/Article.js');

routes.get('/', (req, res) => {
  res.render('index');
});


routes.get("/scrape", (req, res)=>{
  
  
  request(
  "http://pitchfork.com/search/?query=radiohead",
  (err, response, html) => {
    var $ = cheerio.load(html);

    $("#result-news .result-item").each((i, element) => {
      var result = {};

      if (i < 5) {
        result.title = $(element).find(".title").find("a").text();
        result.link = $(element).find(".title").find("a").attr("href");
        result.website = "pitchfork"

        var entry = new Article(result);

        entry.save
      }
    });
    console.log(pitchforkItems);
  }
);
  
})

module.exports = routes;