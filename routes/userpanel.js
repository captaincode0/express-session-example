var express = require("express");
var router = express.Router();

router.get("/logut", function(req, res){
	res.send("Logging out user");
});

router.get("/profile", function(req, res){
	res.send("User profile");
});

router.get("/stats", function(req, res){
	res.send("Stats section");
});

router.get("/galery", function(req, res){
	res.send("Galery options");
});

/*router.get("/module/:name", function(req, res){

});*/

module.exports = router;