var express = require("express");
var app = express();
var cookieparser = require("cookie-parser");
var expresssession = require("express-session");
var bodyparser = require("body-parser");

//set the cookie parser
app.use(cookieparser());
//set the session handler
app.use(expresssession({
	secret: "3CWF-rrZ3-WRxAQ378",
	resave: true,
	saveUninitialized: true
}));

//use body parser to works with json and encoded url
app.use(bodyparser.urlencoded({extended:true}));
app.use(bodyparser.json());

//mount the routes
app.use("/", require("./routes/index"));
app.use("/userpanel", require("./routes/userpanel"));
app.use("/userpanel/admin/users", require("./routes/userpanel-adminusers"));


app.listen(4444, function(){
	console.log("[+] Express session example application");
	console.log("[+] Port: 4444");
});