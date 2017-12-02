var mongoose = require('mongoose');
var counter = require('./Counter');

var schemaDetails = {
    id: {type: Number, unique:true},
    user_id: {type: Number, required: true,unique:true},
	value:{ type: String, required:true}
}

var SaltSchema = new mongoose.Schema(schemaDetails);

SaltSchema.pre('save',function(next){
	var doc = this;
	counter.findByIdAndUpdate({_id:'saltId'}, {$inc: { seq: 1} }, function(error, counter)   {
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


var model = mongoose.model('Salt', SaltSchema);
module.exports = model;
