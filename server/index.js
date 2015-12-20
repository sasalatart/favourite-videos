var express = require('express'),
    wagner  = require('wagner-core');

var app = express();

require('./models/models')(wagner);

app.listen(3000);
console.log('Listening on port 3000!');
