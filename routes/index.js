var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: '중복 로그인 방지!!!!!' });
});

module.exports = router;
