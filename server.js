const express = require('express'),
request = require('request'),
bodyParser = require('body-parser'),
cheerio = require('cheerio'),
exphbs = require('express-handlebars'),
mongoose = require('mongoose');

const route = require('./routes');

const app = express();

const port = process.env.PORT || 3000;

app.set('port', port);

app.use(express.static('./public'));

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

// var hbs = exphbs.create({
//     helpers:{
//         pitchfork: (newsItems)=>{
//             if(newsItems.website === "pitchfork"){
//                 console.log(data)
//                 return data
//             }
//         }
//     }
// })

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));

var databaseUri = "mongodb://localhost/news-scrape";

if(process.env.MONGODB_URI) {
    mongoose.connect(process.env.MONGODB_URI);
} else {
    mongoose.connect(databaseUri);
}

// mongoose.connect("mongodb://localhost/news-scrape");
var db = mongoose.connection;

// logs any mongoose errors
db.on("error", (err)=>{console.log("Mongoose Error:", err);});

db.once("open", ()=>{ console.log("Mongoose connection successful")});


app.use('/', route);

app.listen(port,()=>{console.log('Listening on port', port);});