var mongoose = require('mongoose');
var shortid = require('shortid');

module.exports = mongoose.model('Article', new mongoose.Schema({
    // title of article
    title : String,
    // author(s) of article
    authors: [String],
    // summary of article
    summary : String,
    // website article comes from
    site : {
        type : String,
        ref : 'Site'
    },
    // url of article
    url : String,
    // rating of particular article
    rating : Number,
    // article keywords
    keywords : [String],
    // user-moderated content on particular article
    comments : [{author : String, comment : String}],
    // date article was published
    published: {
        default: Date.now(),
        type: Date
    },
    // internal id
     _id: {
        type: String,
        default: shortid.generate
    }
}));