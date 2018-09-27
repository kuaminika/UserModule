function KuaminikaLogger()
{
	var _public = this;
	var _private = {};
	var line = "-----------------------------------------";
	_public.log = function(msg)
	{
		try{
			var currentDate = new Date();
			var time = currentDate.toLocaleDateString() + currentDate.toLocaleTimeString();
			
			if(_public.log.caller.name)		
				console.log(time + ":"+ "from -- "+ _public.log.caller.name);

			console.log(time + ":"+ " "+JSON.stringify(msg));
		}
		catch(error)
		{
			console.log("ERROR WHILE LOOGING :");
			console.log(msg);
			console.log(line);
			console.log(error);
		}
	}
	
}


module.exports = KuaminikaLogger;