var express = require('express');
var app = express.Router();

app.get('/', function(req, res) {
    res.render('dashboard'); // load the index.ejs file
});   

module.exports = app; 