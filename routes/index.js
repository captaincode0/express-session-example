var express = require("express");
var router = express.Route();

router.get("/". function(req, res){
	res.send("Home page");
});

router.get("/about", function(req, res){
	res.send("About page")
});

router.get("/contact", function(req, res){
	res.send("Contact page");
});

router.get("/login", function(req, res){
	res.send("Login page");
});

module.exports = router;