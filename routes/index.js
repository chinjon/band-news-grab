const routes = require('express').Router();
const request = require('request');
const cheerio = require('cheerio');
const Article = require('./../models/Article.js');

routes.get('/', (req, res) => {
  res.render('index');
});


routes.post("/scrape", (req, res)=>{
  
  var searchTerm = req.body.term;
  // console.log(searchTerm);

  
  request(
  `http://pitchfork.com/search/?query=${searchTerm}`,
  (err, response, html) => {
    var $ = cheerio.load(html);

    $("#result-news .result-item").each((i, element) => {
      var result = {};

      if (i < 5) {
        result.title = $(element).find(".title").find("a").text();
        result.link = $(element).find(".title").find("a").attr("href");
        result.website = "pitchfork"

        //console.log(result)
        var entry = new Article(result);

        entry.save((err,data)=>{
          if(err){console.log(err)}
          else {console.log(data)};
        });
      }

    });
    // console.log(pitchforkItems);
  });
  res.send("Scrape Complete");
})

module.exports = routes;