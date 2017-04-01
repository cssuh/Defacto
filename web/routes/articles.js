/**
 * Articles router
 */
var express = require('express');
var Router = express.Router();

var mongoose = require('mongoose');

// summary API
var SMMRY = require('../apis/smmry');

// Get articles mongoolse model
var Article = require('../mongo/models/Article');

// returns all articles
Router.route('/')
    .get(function(req,res,next){
       Article.find()
        .limit(req.query.limit || 10)
        .sort()
        .exec( function(err, Articles){
            res.json(err || Articles);
        });
    })
    .post(function(req,res,next){
        var text = req.body.text;
        SMMRY(text, function(data){
            var article = new Article({
                title : req.body.title,
                url : req.body.url,
                rating : req.body.rating || 0,
                published : req.body.published,
                // author(s) of article
                authors: (req.body.authors || "").split(","),
                // summary of article
                summary : data.sm_api_content,
                keywords : data.sm_api_keyword_array,
            });
            article.save(function(err, art) {
                res.json( err || {
                    status: 200,
                    message: "success",
                    article : art,
                });
            });
        });
    });

Router.route('/:article_id')
    .get(function(req, res, next){
        Article.findOne({
            _id: req.params.article_id
        })
                .exec(function(err, art){
                    res.json(err || art);
                });
    });

Router.route('/url/:url')
    .get(function(req, res, next){
        Article.findOne({
                    url: decodeURI(req.params.url)
        })
                .exec(function(err, art){
                    res.json(err || art);
                });
    });

module.exports = Router;