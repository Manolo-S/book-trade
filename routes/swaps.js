var express = require('express');
var router = express.Router();

router.get('/', function(req, res){
	res.render('swaps');
});

// router.get('/', function(req, res){
// 	res.render('index', {user: {
// 								id: req.user.id,
// 								service: req.user.service
// 							   }
// 						}
// 	)
// });

module.exports = router;











