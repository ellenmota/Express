var express =  require('express');
var app = express();
var bodyParser = require('body-parser');
// var cassandra = require('cassandra-driver');
// var client = new cassandra.Client({ contactPoints: ['localhost']});
var MongoClient = require('mongodb').mongoClient;
//Para debugar usar o comando: set DEBUG=express:* & node index.js
var user = require('./connectMongoose');



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
// app.get('/user/:id',function (req,res,next){
//   if(req.params.id == 0)
//     next('route');
//   else
//     next();
// }, function (req,res,next) {
//     res.render('user', {id: req.params.id});
// });

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

// app.use(bodyparser());
// app.use(erros());
//Usar middleware de manipulação de erros depois de todos os use


//Para uso de Proxys
app.set('test proxy',function(ip){
  if(ip === '127.0.0.1' || ip ==='127.3.3.3'){
    return true;
  }
  else{
    return false;
  }
});

//Conexão com BD - cassandra
// client.execute('Select key from system.local',function(err,result){
//   if (err) throw err;
//   console.log(result.rows[0]);
// });

//Conexão com BD - mongodb
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

//Método post cria!
app.post('/user',function(req,res){
  //res.render('user',req.body);
  console.log(req.body);

  var usuario = new user(req.body);
  usuario.save(function (err) {
  if (err) {
    console.log(err);
  } else {
      console.log('Sucesso! Atributos preenchidos!');
    }
  });

  res.send('Ok');

});

//Método put = alteração
app.put('/user/:id',function(req,res){
  var query = {name:'Ellen2333'};
user.findOneAndUpdate(query, { $set: { name: 'maoii' }});
  res.send('Ok');
});
//Método delete
app.delete('/user/:id',function(req,res){

  user.find({_id:req.params.id}).remove().exec();

  res.send('Excluido com sucesso!');
});

//Porta
app.listen(3000, function (){
  console.log('Test Middleware...');
});
