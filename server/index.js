var express       = require('express'),
    morgan        = require('morgan'),
    mongoose      = require('mongoose'),
    bodyParser    = require('body-parser'),
    session       = require('express-session'),
    passport      = require('passport'),
    cookieParser  = require('cookie-parser');

var app = express();

var DB_HOST = process.env.DATABASE_HOST || 'mongo_db';
var DB_PORT = process.env.DATABASE_PORT || '27017';
mongoose.connect('mongodb://' + DB_HOST + ':' + DB_PORT + '/favouriteVideos');

require('./config/passport')(passport);

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser(process.env.COOKIE_SECRET || 'napoleon'));
app.use(session({
  cookie: { maxAge: 3000000 },
  secret: process.env.SESSION_SECRET || 'napoleon',
  saveUninitialized: true,
  resave: true
}));
app.use(passport.initialize());
app.use(passport.session());

app.use('/bower_components',  express.static('bower_components'));
app.use(express.static('client/assets'));
app.use(express.static('client/templates'));

require('./routes')(app, passport);

app.listen(8888);
console.log('Listening on port 8888!');
