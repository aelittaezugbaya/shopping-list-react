var express = require('express');
var router = express.Router();
const Mongoose = require('mongoose');
const Models = require('../mongooseModel')
const crypto = require('crypto');
const jwt= require('jsonwebtoken');

router.post('/register',(req,res)=>{

  let salt = crypto.randomBytes(16).toString('hex');

  let hash = crypto.pbkdf2Sync(req.body.password, salt, 1000, 64, 'sha1').toString('hex');
  console.log(req.body.password)
  let newUser = Models.User({
    username:req.body.username,
    role:req.body.role,
    hash: hash,
    salt: salt,
  })

  newUser.save((err,newUser)=>{
    if(err) {
      return console.log(err);
    }
    res.send(newUser);
  })
})

router.post('/login',(req,res)=>{
  new Promise(function(resolve,reject){
    Models.User.find({ username: req.body.username},(err, user)=> {
      if(err)
        return reject("Error finding User with Email " + req.body.username + ".");

      return resolve(user);
    })
  }).then(user=>{
    console.log(req.body)
    let hash = crypto.pbkdf2Sync(req.body.password, user[0].salt, 1000, 64, 'sha1').toString('hex');
    if(hash !== user[0].hash) {
      console.log("Authentication error");

      res.status("Authentication error");
      res.status(401);
      res.send();
      return;
    }


    let expiry = new Date();

    expiry.setMinutes(expiry.getMinutes() + 30);

    let jwttoken = jwt.sign({
      _id: user[0]._id,
      username: user[0].username,
      role:user[0].role,
      exp: parseInt(expiry.getTime() / 1000)
    }, 'secret');

    res.send(jwttoken);
  })

})

//Get list of all items in the list
router.get('/items',function(req, res, next){
  new Promise((resolve,reject) => {
    Models.Items.find({},function(err,items){
      if (err) {
        return reject("Error finding Items.");
      }
      return resolve(items);
    })
  }).then(items=>{
    res.json(items);
  }).catch(reason=>{
    console.log("Server error: " + reason)
    res.status(500);
    res.send(reason);
  })
});

//add new item to the list
router.post('/items',function(req,res,next){
  new Promise((resolve, reject)=>{
    let newItem = Models.Items({
      name:req.body.name,
      done:false
    });
    newItem.save(function(err,newItem){
      if(err) {
        return console.log(err);
      }
      return resolve(newItem)
    })
  }).then((newItem)=>{
    res.send('saved: '+newItem.name)
  }).catch(function(reason){
    console.log("Server error: " + reason);
    res.status(500);
    res.status(reason);
  })

})

// changed status of done int the item
router.put('/items/:id', function(req,res,next){
  Models.Items.find({_id:req.params.id},(err,item)=>{
    if(err)
      return ("Error finding Item with ID " + req.params.id + ".");
    console.log(item)
    return item;
  }).then((item)=> {
    Models.Items.update({
        _id: req.params.id
      },
      {
        done: !(item[0].done),
      },
      (err, item)=>{
        if (err) throw err;
        res.send(item);
      })
  })
});
// delete items from the list
router.delete('/delete/:id', function(req,res,next){
  console.log('deleting item', req.params.id);
  Models.Items.remove({_id:req.params.id}, (err,data)=>{
    if(err) throw err;
    res.send(data)
  })
})



module.exports = router;