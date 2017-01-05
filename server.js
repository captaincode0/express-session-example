var express = require("express");
var app = express();

app.get("/", function(req, res){
	res.send("<h1>HI</h1>");
});

app.listen(4444, function(){
	console.log("[+] Express session example application");
});