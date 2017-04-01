let mongoose = require('mongoose');

mongoose.connect('mongodb://chris:suh@ds147510.mlab.com:47510/defacto');

module.exports = mongoose.connection;