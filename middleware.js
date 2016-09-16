var express =  require('express');
var app = express();

app.use(function (req,res,next){
  console.log('Time: ',Date.now());
  next();
});

// app.use('/user/:id',function(req,res,next){
//   console.log('Request Type: ',req.method);
//   next();
// });

app.get('/user/:id',function (req,res,next){
  // console.log(req);
  res.send('User');
});

//Middleware com varias funções
app.get('/user/:id',function (req,res,next){
  console.log('Requisição: ', req.originalURL);
  next();
}, function(req,res,next){
    console.log('Request: ');
    next();
});

//Varios caminhos para a mesma rota
app.get('/user/:id', function (req, res, next){
  console.log('Requisição user: ', req.params.id);
  next();
}, function (req, res, next){
  res.send('User info.');
});

app.get('/user/:id', function (req, res, next){
  res.end(req.params.id);
});

//rotas condicionais com rotas
app.get('/user/:id',function (req,res,next){
  if(req.params.id == 0)
    next('route');
  else
    next();
}, function (req,res,next) {
    res.render('regular');
});

app.get('user/:id', function (req, res, next){
  res.render('special');
});

app.listen(3000, function (){
  console.log('Test Middleware...');
});
