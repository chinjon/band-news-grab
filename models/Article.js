const mongoose = require('mongoose');

var Schema = mongoose.Schema;

const ArticleSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    link: {
        type: String,
        required: true
    },
    website: {
        type: String,
        required: true
    }
})

var Article = mongoose.model("Article", ArticleSchema);

module.exports = Article;