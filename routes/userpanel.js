var express = require("express");
var router = express.Router();
var auth_middleware = require("./middleware/auth");

router.get("/profile", auth_middleware, function(req, res){
	res.send("User profile");
});

router.get("/stats", auth_middleware, function(req, res){
	res.send("Stats section");
});

router.get("/galery", auth_middleware, function(req, res){
	res.send("Galery options");
});

router.get("/logout", auth_middleware, function(req, res){
	var user_login_controller = new UserLoginController();
	user_login_controller.logout(function(){
		console.log("[+] Logging out the user");
		console.log("[+] Destroying sessions");
		req.session.destroy();
		res.send("Session destroyed");
	});
});

module.exports = router;