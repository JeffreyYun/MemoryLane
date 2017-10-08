var express = require('express');
var fs = require('fs');
var passport    = require("passport");
var router = express.Router();
var User = require("../models/user");

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

////////////////////////////
// Authentication Routes
////////////////////////////

// show registration form
router.get("/join", function(req, res){
    res.render("join");
});

// process the signup form
router.post('/join', passport.authenticate('local-signup', {
    successRedirect : '/profile', // redirect to the secure profile section
    failureRedirect : '/join', // redirect back to the signup page if there is an error
    failureFlash : true // allow flash messages
}));

// show login form
router.get("/login", function(req, res){
    res.render("login", {message: req.flash("error")});
});

// log in the user
// (page, middleware, callback)
router.post("/login", passport.authenticate("local-login",
    {
        successRedirect: "/profile",
        failureRedirect: "/login",
        failureFlash: true
}));

// log out the user
router.get("/logout", function(req, res){
    req.logout();
    req.flash("success", "You are now logged out.");
    res.redirect("/profile");
});

module.exports = router;
