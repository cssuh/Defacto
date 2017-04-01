/**
 * Articles router
 */

var express = require('express');
var Router = express.Router();

var mongoose = require('mongoose');

// Get articles mongoolse model
var Article = require('../mongo/models/Article');

// returns all articles
Router.route('/')
    .get(function(req,res,next){
       res.json('Hello');   
    });

Router.route('/:article_id')
    .get(function(req, res, next){
        res.json('Hello');
    });

module.exports = Router;