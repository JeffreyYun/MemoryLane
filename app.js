var express = require('express');
var mongoose = require("mongoose");
var path = require('path');
var favicon = require('serve-favicon');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var fs = require('fs');
var sassMiddleware = require('node-sass-middleware');
var flash       = require("connect-flash");
var mongoose    = require("mongoose"),
    passport    = require("passport"),
    LocalStrategy= require("passport-local"),
    methodOverride  = require("method-override");

var app = express();

var server = require('http').Server(app);
var io = require('socket.io')(server);
var time = require('time')(Date);
var index = require('./routes/index');
var Image = require("./models/image");
//var User = require("./models/user");
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(favicon(path.join(__dirname, 'public', 'images/favicon.png')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(sassMiddleware({
  src: path.join(__dirname, 'public'),
  dest: path.join(__dirname, 'public'),
  indentedSyntax: true, // true = .sass and false = .scss
  sourceMap: true
}));
app.use(express.static(__dirname + '/public'));
app.use(methodOverride("_method"));
app.use(flash());
mongoose.Promise = global.Promise;
mongoose.connect(process.env.DB_URL, {useMongoClient: true});

// Passport configuration
app.use(require("express-session")({
    secret: "CaLhacksjeNNiezhnngHaoyuyuyuyuunKyleHesskylkewWongng",
    resave: false,
    saveUninitialized: false,    // security
}));
/*
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());       // determines subset user data to store in session (serialized user)
passport.deserializeUser(User.deserializeUser());   // matches key to user, passing entire user object
*/
// middleware, passes currentUser to all routes
app.use(function(req, res, next){
    res.locals.currentUser = req.user;
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");
    next();
});


app.use("/", index);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  // render the error page
  res.status(err.status || 500);
  res.render('error');
});


io.sockets.on('connection', function (socket) {
  socket.on('img' , function (data) {
    var now = new time.Date();
    var url = data.imgURL.replace(/^data:image\/\w+;base64,/, "");
    var buf = new Buffer(url, 'base64');
    var imgNewURL=data.name+now.toString().replace(/\s|\:|\(|\)|\-/g, '')+'.png'
    fs.writeFile('./public/pictures/'+imgNewURL, buf);
    fs.appendFile('./public/pictures/info.txt', data.name+";"+data.loc+";"+now.toString()+";"+imgNewURL+'\n');
  });
});



server.listen(process.env.PORT, process.env.IP,function(){
  //console.log("App started on localhost:"+process.env.PORT);
});

