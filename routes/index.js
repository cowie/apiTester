var express = require('express');
var router = express.Router();


const loaderKey = process.env.loaderKey;

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Loader2' });
});

router.get('/loaderio-' + loaderKey, (req, res, next) => {
  res.send('loaderio-' + loaderKey);
})

module.exports = router;
