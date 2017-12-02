var UserRepository  = require('../repository/UserRepository');
var UserFactory = require('../factory/UserFactory');

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
		return repository.add(newItem);
	}
	
	self.authenticate = function(usr,pwd)
	{
		return repository.authenticate(usr,pwd);
	}
}

module.exports= UserService;