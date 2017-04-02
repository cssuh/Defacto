/**
 * Uses sources to seed database with starter data
 */
let source_seeds = require('./sources.json');
let mongoose = require('mongoose');

let Site = require('../mongo/models/Site');
/**
 * extracts domain from a url
 * @param {*} url 
 */
function extractDomain(url) {
    if (typeof url !== "string")
        return null;
    var domain;
    //find & remove protocol (http, ftp, etc.) and get domain
    if (url.indexOf("://") > -1) {
        domain = url.split('/')[2];
    }
    else {
        domain = url.split('/')[0];
    }

    //find & remove port number
    domain = domain.split(':')[0];

    return domain;
}

module.exports = function(){
    source_seeds.map(function(a){
        let s = new Site({
            title : a.site_name,
            url : extractDomain(a.site_url),
            descr : a.description || "",
            search_url : a.search_url,
            bias : a.bias,
            isSatire : a.isSatire,
            rating : a.rating,
        });
        s.save();
        console.log(s);
    });
}