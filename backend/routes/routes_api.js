var express = require('express');
var router = express.Router();
const Mongoose = require('mongoose');
const Models = require('../mongooseModel')

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