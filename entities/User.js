"use strict"

class User{
	constructor(id, email, pass){
		this.id = id;
		this.email = email;
		this.pass = pass;
	}

	getId(){
		return this.id;
	}

	setId(id){
		this.id = id;
	}

	getEmail(){
		return this.email;
	}

	setEmail(email){
		this.email = email;
	}

	getPass(){
		return this.pass;
	}

	setPass(pass){
		this.pass = pass;
	}
}

module.exports = User;