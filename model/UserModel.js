"use strict"

var User = require("../entities/User");
var Model = require("./Model");
var DatabaseController = require("./DatabaseController");


/**
 * the callback of methods needs to be the following
 * function(message, data){
 * 		if(message)
 * 			console.log("Error: "+message);
 *    	
 *    	//if the data exists
 *    	if(data){
 *    		//do something with data
 *    	}	
 * }
 */

class UserModel extends Model{
	constructor(){
		super();
		this.dbcontroller = new DatabaseController(__dirname+"/usersdb");
	}

	/**
	 * [getall get all users of the database]
	 * @param  {Function} callback [to iterate data]
	 * @return {void} 
	 */
	getAll(callback){
		try{
			if(callback.constructor != Function)
				throw new TypeError("The parameter callback needs to");

			//get the current database object
			var database = this.dbcontroller.connect();
		
			//retrieve data from database
			database.all("select * from users", function(error, rows){
				if(error)
					console.log("[-] "+error);
				else{
					if(rows)
						callback(null, rows);
					else
						callback("[-] Error: The table is empty, can't get results from database");
				}
			});

			//close the connection
			this.dbcontroller.close();
		}
		catch(ex){
			console.log(ex);
		}
	}

	/**
	 * [getuser description]
	 * @param  {Integer}   user     [user identifier]
	 * @param  {Function} callback [callback to retrieve data]
	 * @return {void} 
	 */
	getUser(userid, callback){
		try{
			if(typeof userid != "number")
				throw new TypeError("The parameter user needs to be a number");
			if(callback.constructor != Function)
				throw new TypeError("The parameter callback needs to be a function");
			
			var database = this.dbcontroller.connect();
			//prepare one statement with one parameter
			var dbstatement = database.prepare("select * from users where id=?");
			//bind the parameter
			dbstatement.bind(userid);

			//invoke get function to retrieve the first column
			dbstatement.get(function(error, row){
				if(error)
					console.log("[-] "+error);
				else{
					if(row)
						callback(null, row);
					else
						callback("[-] Error: The user doesn't exists, dump: ["+userid+"]");
				}
			});
			dbstatement.finalize();
			this.dbcontroller.close();
		}
		catch(ex){
			console.log(ex);
		}
	}


	/**
	 * [getUserByObject get one user by one User object]
	 * @param  {User}   user     [the user object]
	 * @param  {Function} callback [the callback to collect the data]
	 * @return {void}
	 */
	getUserByObject(user, callback){
		try{
			if(user.constructor != User)
				throw new TypeError("The parameter user needs to be an instance of User class");
			if(callback.constructor != Function)
				throw new TypeError("The parameter callback needs to be a function");

			var database = this.dbcontroller.connect();
			var dbstatement = database.prepare("select * from users where email=? and pass=? limit 1");
			
			dbstatement.bind(user.getEmail(), user.getPass());
			dbstatement.get(function(error, row){
				if(error)
					console.log("[-] "+error);
				else{
					if(row)
						callback(null, row);
					else
						callback("[-] Error: The user doesn't exists, dump: ["+user+"]");
				}
			});

			dbstatement.finalize();
			this.dbcontroller.close();
		}
		catch(err){
			console.log(err);
		}
	}

	/**
	 * [insertUser inserts the user into database]
	 * @param  {User} user [user instance]
	 * @param  {Function} callback [a callback for pass the message]
	 * @return {boolean}      [true: if the user was added correctly | false: if the user wasn't added correctly]
	 */
	insertUser(user, callback){
		try{
			if(user.constructor != User)
				throw new TypeError("The parameter user needs to be an instance of User");
			if(callback.constructor != Function)
				throw new TypeError("The parameter callback needs to be a function");

			var database = this.dbcontroller.connect();
			var dbstatement = database.prepare("insert into users values($id,$email,$pass)");
			var that = this;


			dbstatement.run({
				$id: user.getId(),
				$email: user.getEmail(),
				$pass: user.getPass()
			}, function(error){
				if(error){
					console.log("[-] "+error);
				}
				else
					callback("[+] The user was inserted correctly on the database, dump: ["+user+"]");
			});

			dbstatement.finalize();
			this.dbcontroller.close();
		}
		catch(ex){
			console.log(ex);
		}
	}

	/**
	 * [updateUser updates the user given one user instance]
	 * @param  {User} user [user instance]
	 * @param  {Function} callback [one callback to pass the message]
	 * @return {boolean}      [true: operation executed rightly | false: operation executed badly]
	 */
	updateUser(user, callback){
		try{
			if(user.constructor != User)
				throw new TypeError("The parameter user needs to be an instance of User");
			if(callback.constructor != Function)
				throw new TypeError("The parameter callback needs to be a function");

			var database = this.dbcontroller.connect();
			var dbstatement = database.prepare("update users set email=$email, pass=$pass where id=$id");
			dbstatement.run({
				$id: user.getId(),
				$email: user.getEmail(),
				$pass: user.getPass()
			}, function(error){
				if(error)
					console.log("[-]"+error);
				else
					callback("[+] The user was correctly updated, dump: ["+user+"]");
			});

			dbstatement.finalize();
			this.dbcontroller.close();
		}
		catch(ex){
			console.log(ex);
		}
		finally{
			return ;
		}
	}

	/**
	 * [deleteUser deletes one user from database given one user id]
	 * @param  {Integer} userid [number that represents the user identifier]
	 * @param  {Function} callback [one callback to pass the message]
	 * @return {boolean}        [true: operation was completed succesfuly | false: operation bad executed]
	 */
	deleteUser(userid, callback){
		try{
			if(typeof userid != "number")
				throw new TypeError("The parameter user needs to be an instance of User");

			var database = this.dbcontroller.connect();
			var dbstatement = database.prepare("delete from users where id=$id");
			dbstatement.run({
				$id: userid
			}, function(error){
				if(error)
					console.log("[-] "+error);
				else
					callback("[+] The user was correctly deleted, dump: ["+userid+"]");
			});

			dbstatement.finalize();
			this.dbcontroller.close();
		}
		catch(ex){
			console.log(ex);
		}
		finally{
			return ;
		}
	}
}

module.exports = UserModel;
