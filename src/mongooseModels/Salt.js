var mongoose = require('mongoose');
var Counter = require('./Counter');

var schemaDetails = {
    id: {type: Number, unique:true},
    user_id: {type: Number, required: true,unique:true},
	value:{ type: String, required:true}
}

var SaltSchema = new mongoose.Schema(schemaDetails);

SaltSchema.pre('save',function(next){
	var doc = this;
	Counter.findByIdAndUpdate({_id:'saltId'}, {$inc: { seq: 1} }).then( function( counter)   {
        try{
		
			if(!counter)
			{
				doc.id = 1;
				Counter.create({_id:"saltId",seq:1});
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


var model = mongoose.model('Salt', SaltSchema);
module.exports = model;
