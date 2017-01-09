var express = require("express");
var router = express.Router();

router.get("/", function(req, res){
	if(req.session.last_page)
		res.write("last page was: "+req.session.last_page);

	//set the last page
	req.session.last_page = "/";
	res.send("Home page");
});

router.get("/about", function(req, res){
	if(req.session.last_page)
		res.write("last page was: "+req.session.last_page);

	req.session.last_page = "/about";
	res.send("About page");
});

router.get("/contact", function(req, res){
	if(req.session.last_page)
		res.write("last page was: "+req.session.last_page);

	req.session.last_page = "/contact";
	res.send("Contact page");
});

router.get("/login", function(req, res){
	if(!req.query.email || !req.query.pass)
		res.send("Login failed");
	
	if(req.session.last_page)
		res.write("last page was: "+req.session.last_page);

	req.session.last_page = "/login";
	res.send("Login page");
});

module.exports = router;