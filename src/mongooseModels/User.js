var mongoose = require('mongoose');
var counter = require('./Counter');

var schemaDetails = {
    id: {type: Number,unique:true},
    userName: { type: String, required:true, unique:true},
	email:{ type: String, required:true, unique:true},
	motDePasse:{ type: String, required:true, unique:true},
	firstName:{ type: String, required:true},
	lastName:{ type: String, required:true},
	memberSince:{type:Date,required:true}	
}

var UserSchema = new mongoose.Schema(schemaDetails);

UserSchema.pre('save',function(next){
	var doc = this;
	counter.findByIdAndUpdate({_id:'userId'}, {$inc: { seq: 1} }, function(error, counter)   {
        try{
		
			if(error)
				return next(error);
			doc.id = counter.seq;
			next();
		}
		catch(err)
		{
			next(err);
		}
    });
});


var model = mongoose.model('User', UserSchema);
module.exports = model;
