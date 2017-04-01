var express = require('express');
var Router = express.Router();

var meta = {
    status : 200,
    message : "API up and running"
}

Router.route('/')
    .get(function(req,res,next){
        res.json( meta );
    });

module.exports = Router;