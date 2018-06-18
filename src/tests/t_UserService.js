require('../testDatabase');
var UserService = require('../service/UserService');
var Handler = require('./testUtils/TestHandler');
var formEntryInstaces = require('./testUtils/UserData');

var service = new UserService();
var raw = formEntryInstaces[0];

(function()
{
	testEmailUser()
})()











//////////////////////
function testRecoveryEmailSending()
{
	testAddingTwo().then(function(){
		return service.recoverWithEmailOrUsr(raw.userName)
	}).then(Handler.handleSuccess,Handler.handleError);
}


function testEmailUser()
{
	raw = formEntryInstaces[1];
	service.emailUser(raw,"hihi").then(Handler.handleSuccess,Handler.handleError);;
}
function testAddingTwo()
{
	
	var result =service.add(raw);

	return result.then(function(hh){
		console.log("added");
		raw = formEntryInstaces[1];
	 result =service.add(raw);
	}).then(Handler.handleSuccess,Handler.handleError);
}