var mongoose = require('mongoose');
var shortid = require('shortid');

module.exports = mongoose.model('Article', new mongoose.Schema({
    title : String,
    author: String,
    summary : String,
    url : String,
    rating : Number,
    keywords : [String],
    comments : [{author : String, comment : String}],
    published: {
        default: Date.now(),
        type: Date
    },
     _id: {
        type: String,
        default: shortid.generate
    }
}));