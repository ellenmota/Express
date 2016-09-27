var mongoose =  require('mongoose');
//Mongoose
mongoose.connect('mongodb://localhost/Ellen');

//objeto                   //nomedatabela //Atributos
var user = mongoose.model('User', {name: String, password: String });

module.exports = user;
