var CounterModel = require('../mongooseModels/Counter');


function CounterRepository()
{
	
	var self = this;
	var incrementals = [{_id:"userId",seq:0},{_id:"saltId",seq:0}];
	self.init = function()
	{
		return CounterModel.collection.insert(incrementals);
	}
	
}

module.exports = CounterRepository;