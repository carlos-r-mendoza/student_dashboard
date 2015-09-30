'use strict';

var mongoose = require('mongoose');

var DATABASE_URI = process.env.MONGOLAB_URI || 'mongodb://localhost/mean-stack';

var db = mongoose.connect(DATABASE_URI).connection;

// require('./models/test1/product-model');
// require('./models/test1/customer-model');

module.exports = mongoose.connection;