var UserRepository  = require('../repository/UserRepository');
var Emailer = require('../utils/Emailer');
var UserFactory = require('../factory/UserFactory');
var ErrorCodes = require('../utils/ErrorCodes');
var UserService = function()
{
	var self = this;
	
	var repository = new UserRepository();
	self.getBlank = function()
	{
		var userFactory = new UserFactory();
		return userFactory.createBlank();		
	} 
		
	self.add = function(newItem)
	{		
		return repository.findByUsername(newItem.userName).
				then(function(found)
				{
					if(found===ErrorCodes.userNotFound)
					 return repository.findByEmail(newItem.email);
					
					return Promise.reject( "username:"+newItem.userName+" already exists");
				}).
				then(function(found)
				{
					if(found===ErrorCodes.userNotFound)
						return repository.add(newItem);
					
					return Promise.reject( "email:"+newItem.email+" already exists");
				});
	}
	
	self.recoverWithEmailOrUsr = function(searchItem)
	{
		return repository.findByUsername(searchItem).
				then(function(found)
				{
					if(found===ErrorCodes.userNotFound)
					 return repository.findByEmail(searchItem);
					
					return found;
				}).
				then(function(found)
				{
					if(found===ErrorCodes.userNotFound)
						return repository.findByUsername(searchItem);
					
					return found;
				}).
				then(function(found)
				{
					var emailer = new Emailer();
					
					var recipient = found.email;
					var msg = "to do- link to<a href='google.ca'> reset pwd</a>";
					return emailer.sendTo(recipient,msg);
				});		
	}
	
	self.emailUser = function(user,msg)
	{ 
		var emailer = new Emailer();
		
		var recipient = user.email;
		return emailer.sendTo(recipient,msg);
					
	}
	
	self.authenticate = function(usr,pwd)
	{
		return repository.authenticate(usr,pwd);
	}
}

module.exports= UserService;