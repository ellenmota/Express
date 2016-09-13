var express =  require('express');
var app = express();

app.use(function (req,res,next){
  console.log('Time: ',Date.now());
  next();
});

app.use('/user/:id',function(req,res,next){
  console.log('Request Type: ',req.method);
  next();
});

app.get('/user/:id',function(req,res,next){
  console.log(req);
  res.send('User');
});

app.listen(3000, function(){
  console.log('Test Middleware...');
});
