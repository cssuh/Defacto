var mongoose = require('mongoose');
var shortid = require('shortid');

let Schema = new mongoose.Schema({
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
});
Schema.index({'$**': 'text'});
module.exports = mongoose.model('Site', Schema);
