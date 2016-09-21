var express = require('express');
var app = express();
var birds = require('./birds.js');
/*
Métodos:
        Get =>
        Post =>
        Put =>
        Delete =>
*/

app.get('/',function(req,res){
  res.send('Olá fdp!');
});

app.post('/',function(req,res){
  res.send({
    email: 'gilmar@asd.com',
    authenticated: true
  });
});

//Middleware = Intermediario
app.all('/secret',function(req,res,next){
  res.send('Use Middleware! Secion secreta!');
  next();
});

//Baseado na rota raiz
app.get('/',function(req,res){
  res.send('root');
});

app.get('/about',function(req,res){
  res.send('About');
});

//Padrões de Sequencia
//acd e abcd.
app.get('/ab?cd',function(req,res){
  res.send('ab?cd');
});

//abcd, abbcd, abbbcd
app.get('/ab+cd',function(req,res){
  res.send('ab+cd')
});

//abcd, abxcd, abRABDOMcd, ab123cd
app.get('/ab*cd',function(req,res){
  res.send('ab*cd');
});

///abe e /abcde.
app.get('/ab(cd)?e',function(req,res){
  res.send('ab(cd)?e');
});

//Expressões Regulares
//Qualquer coisa com 'a'
app.get(/a/,function(req,res){
  res.send('/a/');
});

app.get(/.*fly$/,function(req,res){
  res.send('.*fly$');
});

//Mais de uma função para uma rota (comportamento de Middleware)
app.get('/teste/b',function(req,res,next){
  //res.send('Oláa');
  next();
}, function(req,res){
  res.send('Hello!');
});

//Utilizando um array
var k = function(req,res,next){
  console.log('rota k');
  next();
}

var oi = function(req,res,next){
  console.log('rota oi');
  next();
}
var lol = function(req,res){
  res.send('Iee');
}

app.get('/koko',[k,oi,lol]);

//Métodos de Resposta:
/*
res.download()
res.end()
res.json()
res.jsonp()
res.redirect()
res.render()
res.send()
res.sendFile()
res.sendStatus()
*/

//Manipulação de Rotas => route
app.route('/book')
    .get(function(req,res){
      res.send('Com get');ç
    })
    .post(function(req,res){
      res.send('Com post');
    })
    .put(function(req,res){
      res.send('Com put');
    });


app.use('/birds',birds);

app.listen(3000, function() {
  console.log('Listening on port 3000');
});
