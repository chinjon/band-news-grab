const routes = require('express').Router();
const request = require('request');
const cheerio = require('cheerio');

routes.get('/', (req, res) => {
  res.render('index');
});


routes.get("/scrape", (req, res)=>{
  var searchQ = "radiohead"
  request("http://pitchfork.com/search/?query=radiohead", (err, response, html)=>{
    var $ = cheerio.load(html);

    var results = [];
    $(".results-fragment").each((i, element)=>{
      results.title = $(this).children(".title").text();
    })

    console.log(results)
  })
  
})

module.exports = routes;