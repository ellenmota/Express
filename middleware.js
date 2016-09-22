var express =  require('express');
var app = express();
var bodyparser = require('body-parser');

//Para debugar usar o comando: set DEBUG=express:* & node index.js

app.use(function (req,res,next){
  console.log('Time: ',Date.now());
  next();
});

// app.use('/user/:id',function(req,res,next){
//   console.log('Request Type: ',req.method);
//   next();
// });

// app.get('/user/:id',function (req,res,next){
//   // console.log(req);
//   res.send('User');
// });
//
// //Middleware com varias funções
// app.get('/user/:id',function (req,res,next){
//   console.log('Requisição: ', req.originalURL);
//   next();
// }, function(req,res,next){
//     console.log('Request: ');
//     next();
// });
//
// //Varios caminhos para a mesma rota
// app.get('/user/:id', function (req, res, next){
//   console.log('Requisição user: ', req.params.id);
//   next();
// }, function (req, res, next){
//   res.send('User info.');
// });
//
// app.get('/user/:id', function (req, res, next){
//   res.end(req.params.id);
// });

//rotas condicionais com rotas
app.get('/user/:id',function (req,res,next){
  if(req.params.id == 0)
    next('route');
  else
    next();
}, function (req,res,next) {
    res.render('user', {id: req.params.id});
});

// app.get('user/:id', function (req, res, next){
//   res.render('special');
// });

//Manipulação de Erro
app.use(function(err,req,res,next){
  console.error(err.stack);
  res.status(500).send('Algo quebrou!')
});


//Mecanismo modelo, ou seja, html dinamico
app.set('view engine','jade');

app.get('/', function(req,res){
  res.render('index',{title:'Hey',message: 'Hello!'});
});

//Manipulação de error, é usada no final de todos os use, e cria-se funções separadas
function erros(err,req,res,next){
  console.error(err.stack);
  next(err);
}

function erro (err,req,res,next){
  if(req.xhr){
    res.status(500).send({error:"Falhou!"});
    console.log('Falhou!');
  }
  else{
    next(err);
  }
}

app.use(bodyparser());
app.use(erros());
//Usar middleware de manipulação de erros depois de todos os use


//Para uso de Proxys
app.set('test proxy',function(ip){
  if(ip ==='127.0.0.1' || ip==='127.3.3.3'){
    return true;
  }
  else{
    return false;
  }
});

//Porta
app.listen(3000, function (){
  console.log('Test Middleware...');
});
