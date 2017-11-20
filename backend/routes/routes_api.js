var express = require('express');
var router = express.Router();
const Mongoose = require('mongoose');
const Models = require('../mongooseModel')

router.get('/items',function(req, res, next){
  new Promise((resolve,reject) => {
    Models.Items.find({},function(err,items){
      if (err) {
        return reject("Error finding Items.");
      }
      return resolve(items);
    })
  }).then(items=>{
    res.send(items);
  }).catch(reason=>{
    console.log("Server error: " + reason)
    res.status(500);
    res.send(reason);
  })
})



module.exports = router;