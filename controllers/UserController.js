"use strict"

var User = require("../entities/User");
var UserModel = require("../model/UserModel");
var Controller = require("./Controller");

class UserController extends Controller{
	constructor(){
		super(new UserModel());
	}

	add(user){
		
	}

	edit(user){

	}

	del(user){
		
	}
}