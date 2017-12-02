var Salt = require('../models/Salt');
var crypto = require('crypto');

var SaltFactory = function()
{	
	return {
		
		createBlank : function()
		{
			 var result =  new Salt();
			 result.value = crypto.randomBytes(128).toString('base64');
			 return result;
		},
		createFromGivenAttributes:function(rawItem)
		{
			 var result =  new Salt();
			 result.id = rawItem.id;
			 result.user_id = rawItem.user_id;
			 result.value = rawItem.value;
			 return result;
		}
	}
}

module.exports = SaltFactory;