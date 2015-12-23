var express       = require('express'),
    morgan        = require('morgan'),
    mongoose      = require('mongoose'),
    bodyParser    = require('body-parser'),
    session       = require('express-session'),
    passport      = require('passport'),
    cookieParser  = require('cookie-parser');

var app = express();

mongoose.connect('mongodb://localhost:27017/favourite-videos');

require('./config/passport')(passport);

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser(process.env.SECRET));
app.use(session({
  cookie: { maxAge: 60000 },
  secret: process.env.SECRET,
  saveUninitialized: true,
  resave: true
}));
app.use(passport.initialize());
app.use(passport.session());

app.use('/bower_components',  express.static('bower_components'));
app.use(express.static('client'));

require('./routes')(app, passport);

app.listen(3000);
console.log('Listening on port 3000!');
