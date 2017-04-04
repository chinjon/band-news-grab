const routes = require("express").Router();
const request = require("request");
const cheerio = require("cheerio");
const Article = require("./../models/Article.js");

routes.get("/", (req, res) => {
  res.render("index");
});

routes.post("/scrape", (req, res) => {
  var searchTerm = req.body.term;
  // console.log(searchTerm);
  searchTerm = encodeURIComponent(searchTerm);
  request(`http://pitchfork.com/search/?query=${searchTerm}`, (err, response, html) => {

    if (!err && response.statusCode == 200) {
      var $ = cheerio.load(html);
      
      $("#result-news .result-item").each((i, element) => {
        var result = {};

        if (i < 5) {
          var pkUrl = "http://pitchfork.com";

          result.title = $(element)
            .find(".title")
            .find("a")
            .text();
          result.link = pkUrl + $(element)
            .find(".title")
            .find("a")
            .attr("href");
          result.website = "pitchfork";


          //console.log(result)
          var entry = new Article(result);

          entry.save((err, data) => {
            if (err) {
              console.log(err);
            } else {
              console.log(data);
            }
          });
        }
      });
    }

  });

  request("http://consequenceofsound.net/?s="+searchTerm, (err, response, html) => {

    if (!err && response.statusCode == 200) {
      var $ = cheerio.load(html);

      $("#main-content .post-list-module").each((i, element) => {
        var result = {};

        if (i < 5) {
          result.title = $(element)
            .find(".post-title")
            .find("a")
            .text();
          result.link = $(element)
            .find(".post-title")
            .find("a")
            .attr("href");
          result.website = "cos";

          var entry = new Article(result);

          entry.save((err, data) => {
            if (err) {
              console.log(err);
            } else {
              console.log(data);
            }
          });
        }
      });
    }

  });

  request("http://www.stereogum.com/?s="+searchTerm, (err, response, html) => {

    if (!err && response.statusCode == 200) {
      var $ = cheerio.load(html);

      $(".feed-split-image .post").each((i, element) => {
        var result = {};

        if (i < 5) {
          result.title = $(element)
            .find(".preview-holder")
            .find("h2")
            .text();
          result.link = $(element)
            .find(".preview-holder")
            .find("a")
            .attr("href");
          result.website = "stereogum";

          var entry = new Article(result);

          entry.save((err, data) => {
            if (err) {
              console.log(err);
            } else {
              console.log(data);
            }
          });
        }
      });
    }

  });

  res.send("Scrape Complete");
});


routes.get("/articles", (req, res)=>{
  Article.find({}).limit(15).exec((err, data)=>{
    if(err){console.log(err)}
    else{res.json(data)}
  })
})

module.exports = routes;
