var nodemailer = require('nodemailer');
var Emailer =function(user,pwd,service)
{
	var self = this;
	
	self.user = user || "kuaminika@gmail.com";
	self.pwd = pwd || "l3tm31n-01";
	self.service = service || "gmail";
		
	self.getTransporter = function()
	{
		return nodemailer.createTransport({
		  service: self.service,
		  auth: {
			user: self.user,
			pass: self.pwd
		  }
		});
	}
	
	self.getOuterTransport = function()
	{
		self.user = "info@kuaminika.com";
		let config = {
				sendmail: true,
				newline: 'unix',
				path: '/usr/sbin/sendmail'
			};
		return nodemailer.createTransport(config);
	}
	
	self.sendTo = function(recipient, message,subject)
	{
		var transporter = self.getOuterTransport();
		var mailOptions = {
		  from: self.user,
		  to: recipient,
		  subject: subject|| "no subject",
		  text: message
		};
		
		return transporter.sendMail(mailOptions);
	}
}

module.exports = Emailer;