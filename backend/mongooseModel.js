const Mongoose = require('mongoose');

let itemSchema= new Mongoose.Schema({
  name:String,
  done:Boolean
});

module.exports.Items = Mongoose.model('Items', itemSchema, 'Items');