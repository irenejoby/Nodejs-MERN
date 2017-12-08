var express = require('express');
var router = express.Router();

// get homepage
router.get('/', ensureAuthenticated, function(request, response){
  response.render('index');
});

function ensureAuthenticated(request, response, next){
	if(request.isAuthenticated()){
		return next();
	} else {
		// request.flash('error_msg','You are not logged in');
		response.redirect('/users/login');
	}
}

module.exports = router;
