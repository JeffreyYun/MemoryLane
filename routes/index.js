var express = require('express');
var fs = require('fs');

var router = express.Router();
//var User = require("../models/user");

router.get('/', function(req, res, next) {
	res.render('index', { result: "nothing yet" });
});

router.get('/about', function(req, res, next) {
    res.render('about', { result: "nothing yet" });
});

router.get('/help', function(req, res, next) {
    res.render('help', { result: "nothing yet" });
});

// TODO: Add POST route to logs
// TODO: CREATE, READ, UPDATE, DESTROY
router.get('/logs', function(req, res, next) {
    fs.readFile('public/pictures/info.txt', 'utf8', function(err, contents) {
        res.render('logs', { result: contents });
    });
});

router.get('/profile', function(req, res, next) {
    res.render('profile', { result: "nothing yet" });
});

module.exports = router;
