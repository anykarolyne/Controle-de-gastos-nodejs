'use strict';

var express = require('express');
var app = express();
var server = require('http').createServer(app);

/**
 * PERMITINDO REQUISIÇÕES DE LOCALHOST
 */
app.use(function (req, res, next) {
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
	next();
});

app.use('/bower_components', express.static('bower_components'));
app.use('/', express.static('view'));

var socket = require('socket.io')(server);

/**
 * API PARA CADASTRAR ITEMS
 */
var API = new require('./server/items-api.js');
var itemsAPI = new API(app, socket);

/**
 * com 0.0.0.0 fica disponivel na rede
  */
server.listen(3000, '0.0.0.0', function () {
	console.log('Example server listening on port 3000!');
});
