// Require express, initialize it, pass it as an event handler to an HTTP Server
var express = require('express');
var app = express();
var http = require('http').Server(app);

// Require the path module for resolving relative paths safely
var path = require('path');

// Set the public directory for serving files:
// https://expressjs.com/en/starter/static-files.html
app.use(express.static(__dirname));

// Listen for homepage requests, serve the index page
app.get('/', function(req, res) {
    res.sendFile(path.resolve(__dirname + '/../views/index.html'));
})

// Listen on port 3000, or an environment port if specified
var port = process.env.PORT || 3000;
app.listen(port, function() {
    console.log('listening on *:' + port);
})
