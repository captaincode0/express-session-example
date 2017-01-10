var express = require("express");
var router = express.Router();
var auth_middleware = require("./middleware/auth");

router.get("/", function(req, res){
	console.log("[+] Accessing with the next email: "+req.session.useremail);
	res.send("User admin user panel");
});

router.post("/add", auth_middleware, function(req, res){
	
});

router.post("/edit", auth_middleware, function(req, res){

});

router.post("/del", auth_middleware, function(req, res){

});

module.exports = router;