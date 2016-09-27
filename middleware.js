var express =  require('express');
var app = express();
var bodyParser = require('body-parser');
//Utilizando o Mongodb
var MongoClient = require('mongodb').mongoClient;
//Conexão com o Banco de Dados MongoDB
var user = require('./connectMongoose');

//Qual método foi usado
app.use('/hello',function(req,res,next){
  console.log('Request Type: ',req.method);
  next();
});


//Middleware com varias funções
app.get('/teste',function (req,res,next){
  console.log('Requisição: ', req.originalURL);
  next();
}, function(req,res,next){
    console.log('Request: ');
    next();
});

//Vários caminhos para a mesma rota
app.get('/maoii', function (req, res, next){
  console.log('Requisição user: ', req.params.id);
  next();
}, function (req, res, next){
  res.send('User info.');
});

//rotas condicionais com rotas
app.get('/product/:id',function (req,res,next){
  if(req.params.id == 0)
    next('route');
  else
    next();
}, function (req,res,next) {
    res.render('user', {id: req.params.id});
});


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

//Para uso de Proxys
app.set('test proxy',function(ip){
  if(ip === '127.0.0.1' || ip ==='127.3.3.3'){
    return true;
  }
  else{
    return false;
  }
});


//Conexão com BD - mongodb
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());


//Método post cria! = > novo dado
app.post('/user',function(req,res){
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

//Método findone , vulgo, Select
app.get('/user/:id',function(req,res){
  user
    .find({/*'_id': req.params.id*/})
    .sort({name: -1})
    .exec(function(error,User){
      if(error){
        console.log('Busca não encontrada!');
        res.send('Busca não encontrada!');
      } else{
        console.log('Usuario: ', User.name, ', Senha: ', User.password);
        res.send(User);
      }
    });
});

//Método put = alteração
app.put('/user/:id',function(req,res){
              //clausula de consulta(bd)  //alterações
  user.update({'_id': req.params.id},req.body, function(error) {
      if(error){
        console.log('Falhou');
      }
      else {
        res.send('Alteração com sucesso!');
        console.log('Alteração com sucesso!');
      }
  });
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
