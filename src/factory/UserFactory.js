var User = require('../models/User');

var UserFactory = function ()
{
	
	return {
		createBlank :function()
		{
			return new User();
		},
		createFromGivenAttributes:function(rawItem)
		{
			//console.log(rawItem);
			try
			{
				var newUser = new User();
				newUser.id = rawItem.id;
				newUser.userName  = rawItem.userName;
				//newUser.motDePasse = rawItem.motDePasse;
				newUser.email     = rawItem.email;
				newUser.firstName = rawItem.firstName;
				newUser.lastName  = rawItem.lastName;
				newUser.memberSince = rawItem.memberSince ;
				
				console.log("retrieved:"+newUser.userName +", id"+newUser.id);
				return newUser;
			}
			catch(error)
			{
				console.log(error);
			}
		}
	};
};


module.exports = UserFactory;