// impports
var express = require('express');
var path = require('path');
var port = process.env.PORT || 8081;
//var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');


/* Setup API routes */
var api = require('./routes/api');
var articles = require('./routes/articles');

//var comments = require('./routes/content/comments');

var app = express()

var mongo = require('./mongo/controller');

mongo.connect();

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(cookieParser());
app.use(require('stylus').middleware(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));

app.use(express.static('public'));

app.use('/', express.static('public/index.html'));
app.use('/api', api);
app.use('/api/articles', articles);

app.listen(port, function () {
  console.log('listening on port '+ port);
})