var CustomSignalCodes = {
	noSession:{code:71,message:"need to login"}
}


var APIHandler = function(request,response){
	var self = this;
	this.signals = CustomSignalCodes;
	this.success = function(result,code)
	{
		if(code)
		{
			result.code = code;
		}
		return  response.json(result);
	}
	this.error= function(err)
	{
		return response.status(500).json({message:err});
	}
};

module.exports = APIHandler;