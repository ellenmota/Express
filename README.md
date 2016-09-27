# Express
##Sumário:
- app.js : contem expressões regulares e métodos de resposta
- birds.js : contem as rotas, só que estão modulares, ou seja, para usa-la é preciso importá-la.
- middleware.js: contem rotas mais usadas, diagnosticos de erros, conexão e manipulação do banco de dados.
- connectMongoose.js : somente a conexão com o mongoose


Middleware =>  Intermediador entre o servidor e o backend, ou seja, faz as validações necessárias.
Res => resposta do servidor
  - res.send('Algo aqui');
Req => você requer algo
  - req.params.id;
res.end() => finaliza as respostas vinda do servidor
res.render('nome_da_pagina',{parametros}) => renderiza uma pagina html, atraves do jade, não é muito recomendado.
next() => próxima função da rota

###Métodos

-> Get: Obtenção dos Dados
-> Post: Criação dos dados, é preciso utilizar o Postman (opção: Body, raw, tipo: Json )
-> Put(Update): Alteração dos Dados, também é necessário utilizar o Postman
-> Delete: Deleta kk' os dados.
-> find: Buscar algo
  -> sort (ordenação: 1 Crescente -1 Decrescente)
  -> exec(): Usa-se quando não tem callback, ou seja, função que verifica o erro

####Como usá-los:
**Post**:
      var usuario = new user(req.body); => criar um novo usuario e coloca todos os atributos colocados pelo postman
      usuario.save(function (err) { =>verificação de salvo no banco de dados
      if (err) {
        console.log(err);
      } else {
        console.log('Sucesso! Atributos preenchidos!');
        }
      });

**Selecionar algum dado (find):**
      user
      .find({/*'_id': req.params.id*/})  => como se fosse where,ou seja, clausula condicional
      .sort({name: -1}) => Ordenação, descrito acim
      .exec(function(error,User){ => executa e verifica se ocorre erro na execução
        if(error){
          console.log('Busca não encontrada!');
          res.send('Busca não encontrada!');
        } else{
            console.log('Usuario: ', User.name, ', Senha: ', User.password);
            res.send(User);
          }
        });

**Update (Put):**
      user.update({ 'clausula de consulta(bd)' },alterações, function(error) {
      if(error){
        console.log('Falhou');
      } else {
          res.send('Alteração com sucesso!');
          console.log('Alteração com sucesso!');
        }
      });

**Delete:**
      user.find({id ou campo da tabela}).remove().exec();
