'use strict';
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/sableassent',function(err)
{
  if(err)
  {
    console.log('not connected');
	console.log(err);
  }
  else
  {
    console.log('connected to mongo');
  }
});