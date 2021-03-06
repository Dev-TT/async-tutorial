////
////	See async-tutorial for further  explanations
////


var async = require ("async");

///////////// ASYNC SERIES 
///////////// GIVE FUNCTIONS AS ARRAY
///////////// RETURNS: ARRAY
{
	var stack=[];
	f=1;					// External variable for demostration of access from within the async functions

	var function1 = function (callback){	// The callback here is compulsory, even if no callbck is defined below
		console.log("f value: "+f);	// shows access to external variables
		f=f+1;						// modification of external variales
		callback (null, "F1");		// No Error. Returns Value to the parallel call: "F1"
	}

	var function2 = function (callback){
		console.log("f value: "+f);
		f=f+1;
		callback (null, "F2");
		//callback ("ERROR", null);			// returning an error at this moment, the final result will be: [ 'F1', null ], because it stops executing the additional functions
	}

	var function3 = function (callback){
		console.log("f value: "+f);
		f=f+1;
		callback (null, "F3");
	}

	stack.push(function1);
	stack.push(function2);
	stack.push(function3);

	async.series(stack, function(err, result){		// the second parameter (the callback) is OPTIONAL, BUT I have found that without the callback, then the script does not stop on error (in parallel). in series it stops
		console.log("Series callback: ");			// returns array: [ 'F1', 'F2', 'F3' ]
		console.log(result);
	});
}

///////////// ASYNC PARALLEL
///////////// GIVE FUNCTIONS AS OBJECT
///////////// RETURNS: OBJECT
{
	var stack={};
	f=1;

	stack.function1 = function (callback){
		f=f+1;
		console.log("f1 value: "+f);
		callback (null, "F1");

		//callback ("ERROR", null);	
	}

	stack.function2 = function (callback){
		f=f+1;
		console.log("f2 value: "+f);
		callback (null, "F2");
		//callback ("ERROR", null);					// error at this moment makes the following final result: { function1: 'F1', function2: null }
	}

	stack.function3 = function (callback){
		f=f+1;
		console.log("f3 value: "+f);
		callback (null, "F3");
	}

	async.parallel(stack, function(err, result){
		console.log("Parallel callback: ");			// returns object: { function1: 'F1', function2: 'F2', function3: 'F3' }
		console.log(result);
	});
}

///////////// ASYNC WATERFALL (array only)

var stack=[];										// for Waterfall, the stack MUST be an array, not an object
f=1;

var function1 = function (callback){
	f=f+1;
	console.log("f1 value: "+f);
	param1=f;
	callback (null, param1);

	//callback ("ERROR", null);	
}

var function2 =  function (param1, callback){
	f=f+1;
	console.log("f2 value: "+f);
	param2=f;
	callback (null, param2);
	//callback ("ERROR", null);						// error at this moment makes the following final result: { function1: 'F1', function2: null }
}

var function3 =  function (param2, callback){
	f=f+1;
	console.log("f3 value: "+f);
	callback (null, "F3");
}

	stack.push(function1);
	stack.push(function2);
	stack.push(function3);

async.waterfall(stack, function(err, result){
	if (err){
		console.log("WF Error: "+err);
		return;
	}
	console.log("Waterfall callback: ");			// returns object: { function1: 'F1', function2: 'F2', function3: 'F3' }
	console.log(result);
});

