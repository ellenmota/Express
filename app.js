var express = require('express');
var app = express();

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

//

app.listen(3000, function() {
  console.log('Listening on port 3000');
});
