/**
 * Articles router
 */
var express = require('express');
var Router = express.Router();

var mongoose = require('mongoose');

// Get articles mongoolse model
var Site = require('../mongo/models/Site');

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

Router.route('/')
    .get(function(req,res,next){ // Returns all articles
        Site.find()
            .limit(10)
            .exec(function(err, sites){
                res.json(err || sites);
            });
    })
    .post(function(req, res, next){ // Create an article
        let s = new Site({
            title : req.body.title,
            url : extractDomain(req.body.url), // not encoded
            descr : req.body.descr,
            search_url : req.body.search_url,
            bias : req.body.bias,
            isSatire : req.body.isSatire,
            rating : req.body.rating,
        });
        s.save(function(err, site){
            res.json(err || {status : 200, message : "succesfully saved", site : site });
        });
    })

Router.route('/url/:site_url')
    .get(function(req, res, next){ // Get an article by its url
        Site.findOne({
            url : extractDomain(req.params.site_url)
        })
            .exec(function(err, site){
                res.json(err || site);
            });
    })
    .post(function(req,res,next){
        Site.findOneAndUpdate({
            url : extractDomain(req.params.site_url)
        });
    });
module.exports = Router;