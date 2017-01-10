var express = require("express");
var router = express.Router();
var User = require("../entities/User");
var UserLoginController = require("../controllers/UserLoginController");

router.get("/", function(req, res){
	res.send("Home page");
});

router.get("/about", function(req, res){
	res.send("About page");
});

router.get("/contact", function(req, res){
	res.send("Contact page");
});

router.get("/login", function(req, res){
	res.send("Login page");
});

router.post("/login", function(req, res){
	if(!req.body.email || !req.body.pass)
		req.code(400).send("Bad request");
	else if(req.session.userlogged)
		res.code(403).send("The user is logged, end the session and start again.");
	else{
		var email = req.body.email;
		var pass = req.body.pass;

		//build one temporary user
		var tmpuser = new User();
		tmpuser.setEmail(email);
		tmpuser.setPass(pass);

		//build the model
		var user_login_controller = new UserLoginController();

		//check if the user exists in the database
		user_login_controller.login(tmpuser, function(message){
			if(message){
				//if one message was gotten then inititalize the session
				req.session.useremail = email;
				//set user logged equals tru
				req.session.userlogged = true;
				res.send(message);	
			}
			else
				res.code(400).send("Bad Request");
		});
	}
});


module.exports = router;