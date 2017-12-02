var express = require('express');
var UserAPI = require('./UserAPI');

var router = express.Router();
var userApi = new UserAPI(router);

userApi.init();

module.exports = router;