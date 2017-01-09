var express = require("express"):
var router = express.router();

router.get("/admin/users", function(req, res){
	res.send("Admin user panel");
});

router.post("/admin/users/add", function(req, res){
	
});

router.post("/admin/users/edit", function(req, res){

});

router.post("/admin/users/del", function(req, res){

});