var express = require('express');
var router = express.Router();

router.use(function timeLog(req,res,next){
  console.log('Time: ',Date.now());
  next();
});

router.get('/',function(req,res,next){
  res.send('Birds home page!');
  next();
});
router.get('/about',function(req,res){
  res.send('About birds')
});

module.exports = router;
