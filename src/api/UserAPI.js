var UserService = require('../service/UserService');
var APIHandler = require('./apiUtils/APIHandler');
var TokenValidatorService = require('./apiUtils/TokenValidatorService');

var UserAPI = function(router)
{
	var self = this;
	var serice = new UserService();
	var functionalities = {
		authenticate : function(req,res)
		{
			var handler = new APIHandler(req,res);
			try
			{
				var usr  = req.params.usr;			
				var pwd  = req.params.pwd;
				
				serice.authenticate(usr,pwd).then(function(result)
				{
					var tokenService = new TokenValidatorService();
					
					var token = tokenService.getTokenAuthenticatedUser(req,res,result);
					
					handler.success({token:token,user:result})
				},handler.error);
			}
			catch(error)
			{
				handler.error(error);
			}
			
		},
		registration : function(req,res)
		{
			
			var handler = new APIHandler(req,res);
			try
			{
				var newUsr  = serice.getBlank();
				
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
			cosnole.log("loadfing")
			var handler = new APIHandler(req,res);
			handler.success({"s":"f"});		
			//serice.findAll().then({"s":"f"},handler.error);
		}
	}
	
	this.init = function()
	{	console.log("creating routes")
	
		var tokenService = new TokenValidatorService();
		router.use('/secure/*',tokenService.validateToken);
		
		router.get('/user/autenticate/:usr/:pwd',functionalities.authenticate);	
		router.post('/user/registration/',functionalities.registration);
		
		router.get('secure/user/loadProfile',functionalities.loadProfile);	
	}
	
}

module.exports = UserAPI;