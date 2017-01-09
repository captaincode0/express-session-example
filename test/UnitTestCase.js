"use strict"

class UnitTestCase{
	contructor(name){
		this.arr = [];
		this.name = name;
	}

	/**
	 * [addStep description]
	 * @param {[type]} name            [description]
	 * @param {[type]} code            [description]
	 * @param {[type]} expected_result [description]
	 */
	addStep(name, code, expected_result){
		try{
			if(typeof name != "string")
				throw new TypeError("The parameter name needs to be a string");
			if(code.constructor != Function)
				throw new TypeError("The parameter code needs to be a callback");
			
			var test_object = {
				name: name,
				code: code,
				result: expected_result,
				exec: function(){
					if(test_object.code() === result)
						return "TestOK";
					else 
						return "TestFail";
				}
			};

			this.arr.push(test_object);
		}
		catch(ex){
			console.log(ex);
		}
	}

	/**
	 * [delStep description]
	 * @param  {[type]} name [description]
	 * @return {[type]}      [description]
	 */
	delStep(name){
		try{
			if(typeof name != "string")
				throw new TypeError("The parameter name needs to be one string");

			var test_found_index = -1;

			for(var step_index in this.arr){
				//check if the tests exists
				if(this.arr[step_index].name === name){
					test_found_index = step_index;
					break;
				}
			}

			if(test_found_index != -1)
				delete this.arr[test_found_index];
		}
		catch(ex){
			console.log(ex);
		}
	}

	/**
	 * [exec description]
	 * @return {[type]} [description]
	 */
	exec(){
		//loop of test cases
		for(var step_index in this.arr){
			var step = this.arr[step_index];

			console.log("[+] Test Name: "+this.name)
			console.log("[+] Executing a new test");
			console.log("[+] Name: "+step.name);
			console.log("[+] Code: ")
			console.log(step.code.toString());
			console.log("[+] Result: ");
			console.log(step.code.result);
			console.log("[+] Test status: "+step.exec());
		}
	}
}

//module.exports = UnitTestCase;

var u = new UnitTestCase("fsdafhsdjhfgoasdhg");
console.log(u.arr+"[dfsdf]")