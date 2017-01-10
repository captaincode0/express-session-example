"use strict"

var Model = require("../model/Model");

class Controller{
	constructor(model){
		this.setModel(model);
	}

	getModel(){
		return this.model;
	}

	setModel(model){
		try{
			if(model instanceof Model)
				this.model = model;
			else
				throw new TypeError("The field model needs to be an instance of model");
		}
		catch(error){
			console.log(error);
			//if one error occurs then set the model to null
			this.model = null;
		}
	}
}

module.exports = Controller;