
function User()
{
	var self= this;

	self.id= -1;
	self.userName  = "";
	//self.motDePasse = "";
	self.email     = "";
	self.firstName = "";
	self.lastName  = "";
	self.memberSince = new Date();	
}

module.exports = User;