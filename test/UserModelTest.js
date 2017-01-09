var User = require("../entities/User");
var UserModel = require("../model/UserModel");
var UnitTestCase = require("./UnitTestCase");
 
var tmp_user = new User();
var user_model = new UserModel();
var user_model_test = new UnitTestCase("User Model Unit Test");

var test_object = {
	getUserById: function(id, test_callback){
		user_model.getUser(id, function(message, data){
			if(message)
				console.log(message);
			if(data){
				var data_retrieved = data.id+"|"+data.email+"|"+data.pass;
				console.log(data_retrieved);
				test_callback(data_retrieved);
			}
		});
	},
	getAll: function(test_callback){
		user_model.getAll(function(message, data){
			if(message)
				console.log(message);
			if(data){
				/*for(var i=0; i<data.length; i++){
					var user = data[i];
					console.log(user.id+"|"+user.email+"|"+user.pass);
				}*/
				var data_retrieved = "";

				for(var row in data){
					var user = data[row];

					data_retrieved += user.id+"|"+user.email+"|"+user.pass+"\n";	
				}

				console.log(data_retrieved);
				test_callback(data_retrieved);
			}
		});
	}
};

//check if promise object is enabled
if(Promise){
	var test_promise = new Promise(function(resolve, reject){
		try{
			test_object.getUserById(1, function(data_retrieved){
				user_model_test.addStep(
					"user-model-get-user",
					function(){
						//do something with the result
						return data_retrieved;
					},
					"1|amy@nasa.gov|mycat1234"
				);
			});
			test_object.getAll(function(data_retrieved){
				user_model_test.addStep(
					"user-model-get-all",
					function(){
						return data_retrieved;
					},
					"1|amy@nasa.gov|mycat1234\n2|john@nasa.gov|123456\n"
				);
			});
			resolve(user_model_test);
		}
		catch(err){
			reject(err);
		}
	});

	test_promise.then(function(unit_test){
		//executes the unit test
		unit_test.exec();
	}, function(error){
		console.log(error);
	})
}
else
	console.log("[-] Error: The Promise class doesn't exists");