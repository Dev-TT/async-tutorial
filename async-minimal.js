var async = require ("async");

///////////// GIVE FUNCTIONS AS ARRAY
///////////// RETURNS: ARRAY
{
	var stack=[];

	var function1 = function (callback){	// The callback here is compulsory, even if no callbck is defined below
		callback (null, "F1");		// No Error. Returns Value to the parallel call: "F1"
	}

	var function2 = function (callback){
		callback (null, "F2");
		//callback ("ERROR", null);			// returning an error at this moment, the final result will be: [ 'F1', null ], because it stops executing the additional functions
	}

	var function3 = function (callback){
		callback (null, "F3");
	}

	stack.push(function1);
	stack.push(function2);
	stack.push(function3);

	async.series(stack, function(err, result){		// the second parameter (the callback) is OPTIONAL, BUT I have found that without the callback, then the script does not stop on error (in parallel). in series it stops
		console.log("Series callback: ");						// returns array: [ 'F1', 'F2', 'F3' ]
		console.log(result);
	});
}

///////////// GIVE FUNCTIONS AS OBJECT
///////////// RETURNS: OBJECT
{
	var stack={};
	f=1;

	stack.function1 = function (callback){
		callback (null, "F1");

		//callback ("ERROR", null);	
	}

	stack.function2 = function (callback){
		callback (null, "F2");
		//callback ("ERROR", null);			// error at this moment makes the following final result: { function1: 'F1', function2: null }
	}

	stack.function3 = function (callback){
		callback (null, "F3");
	}

	async.parallel(stack, function(err, result){
		console.log("Parallel callback: ");		// returns object: { function1: 'F1', function2: 'F2', function3: 'F3' }
		console.log(result);
	});
}

///////////// WATERFALL (array only)

var stack=[];										// for Waterfall, the stack MUST be an array, not an object
f=1;

var function1 = function (callback){
	// do something...
	// on error
	//callback ("ERROR", null);	
	param1=1;
	callback (null, param1);

}

var function2 =  function (param1, callback){
	// do something...
	// on error
	//callback ("ERROR", null);			// error at this moment makes the following final result: { function1: 'F1', function2: null }

	param2=param1;
	callback (null, param2);

}

var function3 =  function (param2, callback){
	// do something...
	// on error
	//callback ("ERROR", null);			// error at this moment makes the following final result: { function1: 'F1', function2: null }
	callback (null, "LastValue");
}

	stack.push(function1);
	stack.push(function2);
	stack.push(function3);

async.waterfall(stack, function(err, result){
	if (err){
		console.log("WF Error: "+err);
		return;
	}
	console.log("Waterfall callback: ");		// returns object: { function1: 'F1', function2: 'F2', function3: 'F3' }
	console.log(result);
});

