var auth = function(req, res, next){
	if(req.session.userlogged)
		next();
	else
		res.status(403).send("Forbidden");
}

module.exports = auth;