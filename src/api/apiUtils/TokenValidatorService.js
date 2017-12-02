var TokenValidator = require('./TokenValidator');
var APIHandler = require('./APIHandler');

function TokenValidatorService()
{
	var secret = "menSekreA";

	var self = this;
	self.createValidator = function(req,res)
	{
		var tokenValidator = new TokenValidator(secret,req,res);
		return tokenValidator;
	}
	self.getTokenAuthenticatedUser = function(req,res,user)
	{
		
			var validator = self.createValidator(req,res);
		return validator.provideToken(user);
			 
						
	}
	
	self.validateToken= function (req,res,next)
	{
		try
		{
			var tokenValidator = self.createValidator(req,res);
			
			tokenValidator.confirmIfTokenActuallyExists()
			.then(next,function(){
				var handler = new APIHandler(req,res);
				var code = handler.signals.noSession;
				handler.success({message:"there is no session"},code);
			});	
		}
		catch(err)
		{
			console.log("error is pres");
			var handler = new APIHandler(req,res);
			handler.error(err)
		}
	}
		
}

module.exports = TokenValidatorService;