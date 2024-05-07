'use strict';
var fs = require('fs');
var express = require('express');
const dotenv = require('dotenv');

var parser = require('body-parser');
var router = require('./api');
var http = require('http');
//var https = require('https');

/*
var privateKey  = fs.readFileSync('sslcert/privkey.pem', 'utf8');
var certificate = fs.readFileSync('sslcert/cert.pem', 'utf8');
var credentials = {key: privateKey, cert: certificate};*/
//var TokenValidator = require('./api/apiUtils/TokenValidator');
var timeout = require('connect-timeout'); //express v4
var port = 3012
var app = express();

dotenv.config();


//require('./database');
require('./testDatabase');

app.use('/', express.static( __dirname+'/public'));



// Add headers
app.use(function (req, res, next) {
    console.log("inside the use:",req.body)

    // Website you wish to allow to connect
	res.setHeader('Access-Control-Allow-Origin',req.headers.origin || "*");

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
   // res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, x-access-token,application/x-www-form-urlencoded;charset=UTF-8');
	
    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});


app.use(parser.json());
app.use(parser.urlencoded({     // to support URL-encoded bodies
  extended: true
})); 

app.use(timeout(15000));

app.use('/api', router);
//app.all

//app.use(cors());
app.listen(port, function() {
    console.log("The server is running on port "+port+"!");
});

var httpServer = http.createServer(app);
// var httpsServer = https.createServer(credentials, app);
/*
httpsServer.listen(8443,function() {
    console.log("The https server is running on port "+8443+"!");
});*/