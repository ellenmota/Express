var app = express();
var router = express.Router();

//Use-> vai usar algo a parte
router.use(function(req,res,next){
  console.log('Date: ', Date.now());
  next();
});

//Middleware de subtask mostra o metodo da requisição e também url
router.use('/user/:id', function(req, res,next){
  console.log('Url: ',req.originalURL);
  next();
}, function(req, res, next){
  console.log('Metodo', req.method);
  next();
});

//Comparação de parametros
router.get('/user/:id',function(req,res,next){
  if(req.params.id == 0){
    next('route');
  }
  else {
    next();
  }
  //Funcionamento normal
}, function(req, res, next){
  res.render('regular');
});
