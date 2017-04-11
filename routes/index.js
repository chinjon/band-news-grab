const routes = require("express").Router();
const request = require("request");
const cheerio = require("cheerio");
const Note = require("./../models/Note.js");
const Article = require("./../models/Article.js");

routes.get("/", (req, res) => {
  res.render("index");
});

routes.post("/scrape", (req, res) => {
  var searchTerm = req.body.term;
  // console.log(searchTerm);
  var searchTermParsed = encodeURIComponent(req.body.term);

  console.log(searchTermParsed);

  function pitchfork() {
    return new Promise((resolve, reject) => {
      request(
        `http://pitchfork.com/search/?query=${searchTermParsed}`,
        (err, response, html) => {
          if (!err && response.statusCode == 200) {
            var $ = cheerio.load(html);

            $("#result-news .result-item").each((i, element) => {
              var result = {};

              if (i < 5) {
                var pkUrl = "http://pitchfork.com";

                result.title = $(element).find(".title").find("a").text();
                result.link = pkUrl +
                  $(element).find(".title").find("a").attr("href");
                result.website = "pitchfork";
                result.term = searchTerm;

                //console.log(result)
                var entry = new Article(result);

                entry.save((err, data) => {
                  if (err) {
                    console.log(err);
                  }
                  console.log(data);
                  // err ? console.log(err) : res.json(data);
                });
              }
            });
          } else {
            console.log(err);
            reject(err);
          }
          resolve("It worked");
        }
      );
    });
  }

  function cos() {
    return new Promise((resolve, reject) => {
      request(
        `http://consequenceofsound.net/?s=${searchTermParsed}`,
        (err, response, html) => {
          if (!err && response.statusCode == 200) {
            var $ = cheerio.load(html);

            $("#main-content .post-list-module").each((i, element) => {
              var result = {};

              if (i < 5) {
                result.title = $(element).find(".post-title").find("a").text();
                result.link = $(element)
                  .find(".post-title")
                  .find("a")
                  .attr("href");
                result.website = "cos";
                result.term = searchTerm;

                var entry = new Article(result);

                entry.save((err, data) => {
                  if (err) {
                    console.log(err);
                  }
                  console.log(data);
                });
              }
            });
          } else {
            console.log(err);
            reject(err);
          }
        }
      );
    });
  }

  function stereogum() {
    return new Promise((resolve, reject) => {
      request(
        `http://www.stereogum.com/?s=${searchTermParsed}`,
        (err, response, html) => {
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
                result.term = searchTerm;

                var entry = new Article(result);

                entry.save((err, data) => {
                  if (err) {
                    console.log(err);
                  }
                  console.log(data);
                });
              }
            });
          } else {
            console.log(err);
            reject(err);
          }
        }
      );
    });
  }

  let promises = [pitchfork(), cos(), stereogum()];

  Promise.all(promises)
    .then(success => {
      res.json(counter);
    })
    .catch(err => {
      err ? console.log(err) : res.json(false);
    });

  res.redirect("/");
});

routes.get("/articles", (req, res) => {
  Article.find({}).sort({ $natural: -1 }).limit(15).exec((err, data) => {
    if (err) {
      console.log(err);
    }
    res.json(data);
  });
});

// grab article by id
routes.get("/articles/:id", (req, res) => {
  let articleId = req.params.id;
  Article.findOne({ _id: articleId }).populate("note").exec((err, data) => {
    if (err) {
      console.log(err);
    }
    res.json(data);
  });
});

routes.post("/articles/:id", (req, res)=>{
  let newNote = new Note(req.body)

  newNote.save((err,data)=>{
    if(err){
      console.log(err);
    } else {
      Article.findOneAndUpdate(
        {"_id": req.params.id},
        {"note": data._id}
        ).exec((err,data)=>{
          if(err) {
            console.log(err)
          } else {
            res.send(data);
          }
        })
    }
  })
})

routes.get("/show-all", (req, res) => {
  Article.find({}, (err, data) => {
    if (err) {
      console.log(err);
    }
    res.json(data);
  });
});

module.exports = routes;
