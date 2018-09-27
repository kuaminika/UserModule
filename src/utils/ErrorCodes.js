var ErrorCodes = {
	userNotFound :{
		code:001,
		messsage:"user not found"
	},
	pwdEncryptionFailed:{
		code:002,
		messsage:"user not found"
	},
	addingUserFailed:{
		code:003,
		messsage:"failed to add user"
	},
	authenticationFailed:{
		code:004,
		messsage:"authentication failed"
	},
	userExists:{code:5,message:"user already exists"},
	noSession:{code:71,message:"need to login"},
	loginFailed:{code:55,message:"login failed"},
	expiredSession: {code:88,message:"session is expired"},
	unknownError: {code:0,message:"unknown error occured"}
}

  module.exports= ErrorCodes;