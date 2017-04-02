const routes = require('express').Router();
const request = require('request');
const cheerio = require('cheerio');

routes.get('/', (req, res) => {
  res.render('index');
});


routes.get("/scrape", (req, res)=>{
  var searchQ = "radiohead"
  
  // request(
//   "http://pitchfork.com/search/?query=radiohead",
//   (err, response, html) => {
//     var $ = cheerio.load(html);

//     $("#result-news .result-item").each((i, element) => {
//       if (i < 5) {
//         var itemTitles = $(element).find(".title").find("a").text();
//         var itemLink = $(element).find(".title").find("a").attr("href");

//         pitchforkItems.push({
//           title: itemTitles,
//           link: itemLink
//         });
//       }
//     });
//     console.log(pitchforkItems);
//   }
// );
  
})

module.exports = routes;