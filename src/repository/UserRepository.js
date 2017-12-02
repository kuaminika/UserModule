var crypto = require('crypto');

var UserModel = require('../mongooseModels/User');
var SaltModel = require('../mongooseModels/Salt');
var UserFactory = require('../factory/UserFactory');
var SaltFactory = require('../factory/SaltFactory');

function UserRepository()
{
	var self = this;
	
	var performAddSaltToPwd = function(newUser,newSalt)
	{
		return new Promise(function(accept,reject)
		{
			try
			{
				
				crypto.pbkdf2(newUser.motDePasse,newSalt.value,10000,512,function(err,encryptedPwd)
																		{
																			if(err)
																				reject("--"+err)
																			if(encryptedPwd)
																			{
																				newUser.motDePasse = encryptedPwd;
																				accept(newUser);
																			}
																			reject ("pwd Encryption failed");
																																					
																		});
			}
			catch(err){
				reject(err)
			}
		})
		
	}
	
	var performAddUser  = function(newUser)
	{
		return new Promise(function(accept,reject)
		{
			try
			{
				UserModel.create(newUser,function(err,res)
				{
					if(err)
						reject(err);
					
					if(res)
						accept(res);
					else 
					  reject("failed to add record");
					
				});
			}
			catch(error)
			{
				reject(error);
			}
		})
	}
	
	self.add = function(newUser)
	{
		return new Promise(function(resolve,refuse)
		{
			try{
				var userFactory = new UserFactory();
				var saltFactory = new SaltFactory();
				var newSalt = saltFactory.createBlank();
				
				performAddSaltToPwd(newUser,newSalt)
				.then(performAddUser,refuse)
				.then(function(addedUser){
					newSalt.user_id = addedUser.id;
					SaltModel.create(newSalt,function(err,res){
						
						if(err)
							refuse(err)
						if(res)
							resolve(userFactory.createFromGivenAttributes(addedUser));
						else
							refuse("failed to save salt for user_id:"+newSalt.user_id);
					});
				}
				,refuse);
			}
			catch(error)
			{
				refuse(error);
			}
			
		});	
		
	}
	
	self.findByUsername = function(givenUserName)
	{
		return new Promise(function(accept,reject){
			try
			{var userFactory = new UserFactory();
			
				 UserModel.findOne({userName:givenUserName},function(err,res)
				  {
					if(err)
					{
					  reject(err);
					}
					if(res)
						accept(userFactory.createFromGivenAttributes(res));
					else
						accept("not found")
				  });
			}
			catch(err)
			{
				reject(err);
			}
		});
	}
	
	var findByUsernameForAuthentication = function(givenUserName)
	{
		return new Promise(function(accept,reject){
			try
			{
			
				 UserModel.findOne({userName:givenUserName},function(err,res)
				  {
					if(err)
					{
					  reject(err);
					}
					if(res)
						accept(res);
					else
						accept("notFound")
				  });
			}
			catch(err)
			{
				reject(err);
			}
		});
	}
	var findSaltByUserId = function(givenUser_id)
	{
		return new Promise(function(accept,reject){
			try
			{
			
				 SaltModel.findOne({user_id:givenUser_id},function(err,res)
				  {
					if(err)
					{
					  reject(err);
					}
					if(res)
						accept(res);
					else
						reject("notFound")
				  });
			}
			catch(err)
			{
				reject(err);
			}
		});
	}
	self.authenticate = function(userName,passwordToValidate)
	{
		return new Promise(function(accept,reject)
		{
			try
			{
				findByUsernameForAuthentication(userName).then(function(foundUser)
				{
						if(foundUser == "notFound")
						{	
							accept(foundUser);
							return;
						}
						
						findSaltByUserId(foundUser.id).then(function(foundSalt)
						{
							
							crypto.pbkdf2(passwordToValidate,foundSalt.value,10000,512,function(err,hashedResultToValidate)
							{
								if(err)
									reject(err);
								var credentialsAreGood = hashedResultToValidate.toString() === foundUser.motDePasse;//user.password.buffer.toString();
								var userFactory = new UserFactory();
								console.log(credentialsAreGood);
								if(credentialsAreGood)
									accept(userFactory.createFromGivenAttributes(foundUser))
							

								reject("authentication failed");
																										
							});
						},reject);
					
				},reject);
			}
			catch(err){
				reject(err)
			}
		})
	}
}

module.exports = UserRepository;