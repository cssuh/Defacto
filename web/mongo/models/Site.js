var mongoose = require('mongoose');
var shortid = require('shortid');

module.exports = mongoose.model('Site', new mongoose.Schema({
    // title of article
    title : String,
    url : String,
    descr : String,
    search_url : String,
    bias : String,
    isSatire : Boolean,
    rating : Number,
    // for selecting information (?) 
    selectors : [{field : String, selector : String}],
    // internal id
     _id: {
        type: String,
        default: shortid.generate
    }
}));