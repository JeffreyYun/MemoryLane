var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
	res.render('index', { result: "nothing yet"});
});

module.exports = router;
