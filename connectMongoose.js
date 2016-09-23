var mongoose =  require('mongoose');
//Mongoose
mongoose.connect('mongodb://localhost/test');

var user = mongoose.model('Cat', { Id: String, name: String, password: String });

module.exports = user;
