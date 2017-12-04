const Mongoose = require('mongoose');

let itemSchema= new Mongoose.Schema({
  name:String,
  done:Boolean
});

let userSchema = new Mongoose.Schema({
  username: {
    type: String,
    unique: true,
    required: true
  },
  role:String,
  hash: String,
  salt: String,

})

module.exports.Items = Mongoose.model('Items', itemSchema, 'Items');

module.exports.User = Mongoose.model('Users',userSchema,'Users');