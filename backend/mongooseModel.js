const Mongoose = require('mongoose');

let itemSchema= new Mongoose.Schema({
  name:String,
  done:Boolean
});

module.exports.Items = MONGOOSE.model('Items', itemSchema, 'Item');