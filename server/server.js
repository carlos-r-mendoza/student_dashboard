'use strict';
//initiates express app
var express = require('express'),
	app = express(),
	routes = express.Router(),
	bodyParser = require('body-parser'),
	// db = require('./database'),
	//path is a node.js module that contains utilites for handling and transforming file paths
	path = require('path');

// for Heroku purposes
var port = Number(process.env.PORT || 3000);

app.listen(port);

// db.on('error', console.error.bind(console, 'mongodb connection error:'));
// db.once('open', function (callback){
// 	console.log('mongodb connected!');
// });

var clientPath = path.join(__dirname, '../client');
var bowerPath = path.join(__dirname, '../bower_components');
var indexHtmlPath = path.join(__dirname, '../client/index.html');

app.use(express.static(clientPath));
app.use(express.static(bowerPath));

// Parse our POST and PUT bodies.
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api', require('./routes/student-data'));



//route to index.html or any url not registered
app.get('/*', function(req, res){
	res.sendFile(indexHtmlPath);
});

module.exports = app;
