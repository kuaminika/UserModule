require('../testDatabase');
var UserRepository = require('../repository/UserRepository');

var repository = new UserRepository();
var Handler = { 
handleError : function(err){console.log(err);}
,
	handleSuccess :function(msg){console.log(msg);}
}

var raw = {
 // id: -1,
  userName: 'hihiMan',
  motDePasse: 'dsgsgsdgsd',
  email: 'hop@gmail.com',
  firstName: 'herman',
  lastName: 'duquerro'
  ,  memberSince:new Date('2017-11-19T22:27:53.823Z') 
  }
  
repository.add(raw).then(Handler.handleSuccess,Handler.handleError);

//repository.findByUsername(raw.userName).then(Handler.handleSuccess,Handler.handleError);

//repository.findByUsername(raw.userName+2).then(Handler.handleSuccess,Handler.handleError);
  
//repository.authenticate('hihiMan','dsgsgsdgsdpp').then(Handler.handleSuccess,Handler.handleError);


	
	
	