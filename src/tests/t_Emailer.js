var Emailer = require('../utils/Emailer');
var Handler = require('./testUtils/TestHandler');


var emailer = new Emailer("info@kuaminika.com");
var recipient = "kejeyorel@fxprix.com";
var msg = "this is a test";
emailer.sendTo(recipient,msg).then(Handler.handleSuccess,Handler.handleError);

