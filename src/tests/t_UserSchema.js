
var UserModel = require('../mongooseModels/User');

var specimen = new UserModel();

console.log(specimen);


var raw = {
  id: -1,
  userName: 'hihiMan',
  motDePasse: 'dsgsgsdgsd',
  email: 'hop@gmail.com',
  firstName: 'herman',
  lastName: 'duquerro',
  memberSince:new Date('2017-11-19T22:27:53.823Z') }
  
  
var specimen = new UserModel(raw);

console.log(specimen);
