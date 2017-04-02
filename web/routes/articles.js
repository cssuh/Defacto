/**
 * Articles router
 */
var express = require('express');
var Router = express.Router();

var mongoose = require('mongoose');

// summary API
var SMMRY = require('../apis/smmry');
var TA = require('../apis/text_analytics');

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
        var article = new Article({
            title : req.body.title,
            url : req.body.url,
            rating : req.body.rating || 0,
            published : req.body.published,
            // author(s) of article
            authors: (req.body.authors || "").split(","),
            // summary of article
            //summary : data.sm_api_content,
            //keywords : data.sm_api_keyword_array,
        });
        res.json({
            status: 200,
            message: "request sent",
            article : article,
        });
        article.save();
        // text analytics
        TA(text, function(data){
            console.log(data);
            if(data && data.documents)
                article.update({
                    sentiment : data.documents[0].score    
                }).save();
        });
        // summarize text
        SMMRY(text, function(data){
            if(data && data.sm_api_content)
                article.update({
                    summary : data.sm_api_content,
                    keywords : data.sm_api_keyword_array
                }).save();
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
        console.log(req.params.url);
        Article.findOne({
                url: decodeURI(req.params.url)
             })
                .exec(function(err, art){
                    res.json(err || art);
                });
    });

module.exports = Router;