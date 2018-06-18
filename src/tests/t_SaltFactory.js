var SaltFactory = require('../factory/SaltFactory');

var factory = new SaltFactory();


var specimen = factory.createBlank();
console.log(specimen);


var raw =  {
  id: 5,
  user_id: 55,
  value: '8MkBSwZPqE9PfU30VJV4I5pEjA1ScS8cIGKNRsCZdS7WMj485xZoe/rdhBwvxtn9CvlVIibT+9S4gTYXOwhcptZREVtwZ+FtJxHTbPgR2feUUV4CoqVoXA2DQFIKBy1hLbdUftxVdNZpkWkAfclxYar9vUFFh/EvGS+YS7XpBsU=' }



var specimen = factory.createFromGivenAttributes(raw);
console.log(specimen);