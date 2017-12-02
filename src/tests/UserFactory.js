var UserFactory = require('../factory/UserFactory');

var factory = new UserFactory();


var specimen = factory.createBlank();
console.log(specimen);


var raw = {
  id: -1,
  userName: 'hihiMan',
  motDePasse: 'dsgsgsdgsd',
  email: 'hop@gmail.com',
  firstName: 'herman',
  lastName: 'duquerro',
  memberSince:new Date('2017-11-19T22:27:53.823Z') }


var specimen = factory.createFromGivenAttributes(raw);
console.log(specimen);