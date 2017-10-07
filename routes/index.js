var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
	res.render('index', { result: "nothing yet" });
});

router.get('/about', function(req, res, next) {
    res.render('about', { result: "nothing yet" });
});

router.get('/help', function(req, res, next) {
    res.render('help', { result: "nothing yet" });
});

module.exports = router;
