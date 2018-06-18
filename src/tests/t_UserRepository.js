require('../testDatabase');
var formEntryInstaces = require('../testData');
var Handler = require('./testUtils/TestHandler');
var UserRepository = require('../repository/UserRepository');
var CounterRepository = require('../repository/CounterRepository');
var cRepo = new CounterRepository();
var repository = new UserRepository();

function initCounter()
{
	console.log("initiating counter");
	
}
var raw = formEntryInstaces[5]
  
  console.log("user count");
  repository.getUserCount().then(function(amount)
  {
	  if(amount===0)
	  {
		  cRepo.init().then(Handler.handleSuccess,Handler.handleError);
	  }
  },Handler.handleError);
  
  
 console.log("about to insert user"); 
// repository.add(raw).then(Handler.handleSuccess,Handler.handleError);

repository.findByUsername(raw.userName).then(Handler.handleSuccess,Handler.handleError);

//repository.findByUsername(raw.userName+2).then(Handler.handleSuccess,Handler.handleError);
  
//repository.authenticate('2hihiMano','dsgsgsdgsd').then(Handler.handleSuccess,Handler.handleError);


	
	
	