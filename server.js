var express = require("express");
var app = express();
var cookieparser = require("cookie-parser");
var expresssession = require("express-session");
var bodyparser = require("body-parser");
var sqlite3 = require("sqlite3").verbose();
var usersdb = new sqlite3.Database("./usersdb");

app.use(cookieparser());
app.use(expresssession({
	secret: "3CWF-rrZ3-WRxAQ378",
	resave: true,
	saveUninitialized: true
}));
app.use(bodyparser.urlencoded({extended:true}));
app.use(bodyparser.json());

//mount the routes
/*app.use("/", require("./routes/index"));
app.use("/userpanel/", require("./routes/userpanel"));
*/

app.locals.production = true;

app.listen(4444, function(){
	console.log("[+] Express session example application");
});