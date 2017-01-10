"use strict"

var Controller = require("./Controller");
var UserModel = require("../model/UserModel");

class UserLoginController extends Controller{
	/**
	 * [constructor]
	 * @return {void}       
	 */
	constructor(){
		super(new UserModel());
	}

	/**
	 * [login log in the user in the application]
	 * @param  {User}   user     [user instance]
	 * @param  {Function} callback [callback to check if the user login was successful]
	 * @return {void}
	 */
	login(user, callback){
		this.model.getUserByObject(user, function(message, data){
			if(message)
				console.log(message);
			if(data){
				callback("Loggin Success, Welcome to your board");
			}
			else
				callback(null);
		});
	}

	/**
	 * [logout logs out the user in the application]
	 * @param  {Function} callback [define your own implementation to close the session]
	 * @return {void}
	 */
	logout(callback){
		//do something awesome before and after invoke the callback
		callback();
	}
}

module.exports = UserLoginController;