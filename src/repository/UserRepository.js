var crypto = require('crypto');
var UserModel = require('../mongooseModels/User');
var SaltModel = require('../mongooseModels/Salt');
var UserFactory = require('../factory/UserFactory');
var SaltFactory = require('../factory/SaltFactory');
var ErrorCodes = require('../utils/ErrorCodes');

function UserRepository()
{
	var self = this;
	
	var performAddSaltToPwd = function(newUser,newSalt)
	{
		return new Promise(function(accept,reject)
		{
			try
			{
				
				crypto.pbkdf2(newUser.motDePasse,newSalt.value,10000,512,'sha512',function(err,encryptedPwd)
																		{
																			
																			if(err)
																				reject("--"+err)
																			if(encryptedPwd)
																			{
																				
																				newUser.motDePasse = encryptedPwd;
																				accept(newUser);
																			}
																			reject (ErrorCodes.pwdEncryptionFailed);
																																					
																		});
			}
			catch(err){
				reject(err);
			}
		})
		
	}
	
	var performAddUser  = function(newUser)
	{
		return new Promise(function(accept,reject)
		{
			try
			{
			
				UserModel.create(newUser).then(function(res)
				{				
					
					if(res)
						accept(res);
					else 
					  reject(ErrorCodes.addingUserFailed);
					
				}).catch(reject);
			}
			catch(error)
			{
				reject(error);
			}
		})
	}
	
	self.updateUsr = function(user)
	{
		return new Promise(function(acc,rej)
		{
			try
			{
				var query = {id:user.id};
				UserModel.update(query,user,{upsert:false}).then(acc,rej);
			}
			catch(error)
			{
				rej(error);
			}
		});
	}
	
	self.getUserCount = function(queryObject)
	{
		if(!queryObject)
		{
			return UserModel.count();			
		}
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
					try
					{
					
						newSalt.user_id = addedUser.id;
						SaltModel.create(newSalt).then(function(res){
							
							
							if(res)
								resolve(userFactory.createFromGivenAttributes(addedUser));
							else
								refuse("failed to save salt for user_id:"+newSalt.user_id);
						}).catch(refuse);
					}
					catch(error)
					{
						refuse(error);
					}
				}
				,refuse);
			}
			catch(error)
			{
				refuse(error);
			}
			
		});	
		
	}
		function queryResltRection(err,res)
		{
			if(err)
			{
				console.log("theres an error");
				return Promise.reject(err);
			}
			
			console.log("theres no error");
			return Promise.resolve(res);
		}
		
	self.remove = function(query)
	{
		
		query = query ||{};
	
		return UserModel.deleteOne(query,queryResltRection);
	}
	self.findAllUsers = function(query)
	{
		query = query ||{};
		return UserModel.find(query)
	}
	
	self.findByUsernameOrEmail = function(queryObjects)
	{
		return new Promise(function(resolve,reject)
		{
			try
			{
				var userFactory = new UserFactory();
			
				var query = {$or:queryObjects};
				console.log(query);
				UserModel.findOne(query).then(function(res)
				{
					
					if(err)
						return  reject(err);
					
					if(res)
						return resolve(userFactory.createFromGivenAttributes(res));
					else
						return  resolve(ErrorCodes.userNotFound);
					
				})
				.catch(reject)
			}
			catch(err)
			{
				return  reject(err);
			}
		});
	}
	
	self.findByUsername = function(givenUserName)
	{
		return new Promise(function(accept,reject){
			try
			{
				var userFactory = new UserFactory();
			
				 UserModel.findOne({userName:givenUserName}).then(function(res)
				  {
					
					if(res)
						accept(userFactory.createFromGivenAttributes(res));
					else
						accept(ErrorCodes.userNotFound)
				  }).catch(reject);
				
			}
			catch(err)
			{
				reject(err);
			}
		});
	}
	
	
	self.findByEmail = function(givenEmail)
	{
		return new Promise(function(accept,reject){
			try
			{
				var userFactory = new UserFactory();
			
				 UserModel.findOne({email:givenEmail}).then(function(res)
				  {
					 
					if(res)
						accept(userFactory.createFromGivenAttributes(res));
					else
						accept(ErrorCodes.userNotFound)
				  }).catch(reject);
				
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
			
				 UserModel.findOne({userName:givenUserName}).then(function(err,res)
				  {
					 
					if(res)
						accept(res);
					else
						accept(ErrorCodes.userNotFound);
				  }).catch(reject);
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
						if(foundUser === ErrorCodes.userNotFound)
						{	
							accept(foundUser); 
							return;
						}
						
						findSaltByUserId(foundUser.id).then(function(foundSalt)
						{
							
							crypto.pbkdf2(passwordToValidate,foundSalt.value,10000,512,'sha512',function(err,hashedResultToValidate)
							{
								if(err)
									reject(err);
								var credentialsAreGood = hashedResultToValidate.toString() === foundUser.motDePasse;//user.password.buffer.toString();
								var userFactory = new UserFactory();
								console.log(credentialsAreGood);
								if(credentialsAreGood)
									accept(userFactory.createFromGivenAttributes(foundUser))
							

								reject(ErrorCodes.authenticationFailed);
																										
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