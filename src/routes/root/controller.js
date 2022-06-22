const express = require('express');
const router = express.Router();

var codes = require('../../consts/codes');

router.get('/', async function(req, res, next) {
	res.json({'success': true, 'code': codes.SUCCESS, 'message': 'alive'});
});

module.exports = router;