var mongoose = require('mongoose');
var Counter = require('./Counter');

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
	Counter.findByIdAndUpdate({_id:'userId'}, {$inc: { seq: 1} }).then( function( counter)   {
        try{

			console.log("counter found",counter);
			if(!counter)
			{
				doc.id = 1;
				Counter.create({_id:"userId",seq:1});
				next();
				return;
			}
			doc.id = counter.seq;
			next();
		}
		catch(err)
		{
			next(err);
		}
    }).catch(next);
});


var model = mongoose.model('User', UserSchema);
module.exports = model;
