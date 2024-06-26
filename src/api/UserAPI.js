var UserService = require('../service/UserService');
var APIHandler = require('./apiUtils/APIHandler');
var TokenValidatorService = require('./apiUtils/TokenValidatorService');

var UserAPI = function(router)
{
	var self = this;
	var service = new UserService();

	
	var functionalities = {
		authenticate : function(req,res)
		{
			var handler = new APIHandler(req,res);
			try
			{
				var usr  = req.params.usr;			
				var pwd  = req.params.pwd;
				
				service.authenticate(usr,pwd).then(function(result)
				{
					var tokenService = new TokenValidatorService();
					
					var token = tokenService.getTokenAuthenticatedUser(req,res,result);
					
					handler.success({token:token,user:result});
				},handler.error);
			}
			catch(error)
			{
				handler.error(error);
			}
			
		},
		registerUser: function(req,res)
		{
			var handler = new APIHandler(req,res);
			try
			{
				console.log("inside UserAPI.registerUser ",req.body);
				var newUsr  = req.body.newUser;
				newUsr.memberSince = new Date();
				service.add(newUsr).then(function(result)
				{
					var tokenService = new TokenValidatorService();
					
					var token = tokenService.getTokenAuthenticatedUser(req,res,result);
					
					handler.success({token:token,user:result})
				},handler.error);
				//handler.success(newUsr);				
			}
			catch(error)
			{
				console.log("theres an error")
				console.log(error)
				handler.error(error);	
			}
		},
		updateUser:function(req,res)
		{
				console.log(req.body);
			var handler = new APIHandler(req,res);
			var updatedUsr  = req.body.updatedUser;
			service.updateUser(updatedUsr).then(handler.success,handler.error);
		}
		,
		getBlankUser : function(req,res)
		{
			
			var handler = new APIHandler(req,res);
			try
			{
				var newUsr  = service.getBlank();
				//req.body.newUser
				
				handler.success(newUsr);				
			}
			catch(error)
			{
				handler.error(error);	
			}
		}
		,
		loadProfile:function(req,res)
		{
		
				var handler = new APIHandler(req,res);
			try
			{
				var newUsr  = service.getBlank();
				
				//req.body.newUser
				
				handler.success(newUsr);				
			}
			catch(error)
			{
				handler.error(error);	
			}
		},
		getAllUsers: function(req,res)
		{
			
			var handler = new APIHandler(req,res);
			var query= {};
			service.getAllUsers(query).then(handler.success,handler.error);
		},
		removeById: function(req,res)
		{
			
			var handler = new APIHandler(req,res);
			var query= {};
			var id  = req.body.id;
			query.id = id;
			service.remove(query).then(handler.success,handler.error);
		}
	}
	
	this.init = function()
	{	console.log("creating routes")
	
		var tokenService = new TokenValidatorService();
		router.use('/secure/*',tokenService.validateToken);
		
		router.get('/user/autenticate/:usr/:pwd',functionalities.authenticate);	
		router.get('/user/registrationFormDetails/',functionalities.getBlankUser);	
		router.post('/user/registerUser/',functionalities.registerUser);
		router.post('/user/update/',functionalities.updateUser);
		router.get('/user/all/',functionalities.getAllUsers);

		router.post('/user/remove',functionalities.removeById);	
		router.post('/secure/user/loadProfile',functionalities.loadProfile);	
	}
	
}

module.exports = UserAPI;