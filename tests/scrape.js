const request = require("request");
const cheerio = require("cheerio");

var pitchforkItems = [];
var cosItems = [];
var stereogumItems = [];

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

// request("http://consequenceofsound.net/?s=radiohead", (err, response, html) => {
//   var $ = cheerio.load(html);

//   $("#main-content .post-list-module").each((i, element) => {
//     if (i < 5) {
//       var itemTitle = $(element).find(".post-title").find("a").text();
//       var itemLink = $(element).find(".post-title").find("a").attr("href");

//       cosItems.push({
//         title: itemTitle,
//         link: itemLink
//       });
//     }
//   });
//   console.log(cosItems);
// });

request("http://www.stereogum.com/?s=radiohead", (err, response, html) => {
  if (!err && response.statusCode == 200) {
    var $ = cheerio.load(html);

    $(".feed-split-image .post").each((i, element) => {
      if (i < 5) {
        var itemTitle = $(element).find(".preview-holder").find("h2").text();
        var itemLink = $(element)
          .find(".preview-holder")
          .find("a")
          .attr("href");

        stereogumItems.push({
          title: itemTitle,
          link: itemLink
        });
      }
    });
    console.log(stereogumItems);
  }
});
