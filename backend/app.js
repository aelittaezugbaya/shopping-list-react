const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const axios = require("axios");
const Models = require('./mongooseModel')

const index = require('./routes/routes_index');
const api = require('./routes/routes_api');

const app = express();
const http = require('http');
const socketIo = require("socket.io");
let connections=[];


mongoose.connect('mongodb://localhost/shoppingList');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../build')));
console.log(__dirname)

app.use('/', index);
app.use('/api', api);

const server = http.createServer(app);
const io = socketIo.listen(server);

const port = 8000;
server.listen(port);
io.sockets.on('connection',(socket)=>{
  connections.push(socket);
  console.log('Connected: %s sockets connected', connections.length);

  socket.on('disconnect',(data)=>{
    connections.splice(connections.indexOf(socket),1);
    console.log('Disconnected: %s sockets connected', connections.length)
  })

  socket.on('new item',data=>{
    console.log('saved: '+data);
    io.sockets.emit('get items',data);
  })

})


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('Error'+err.message);
});

module.exports = app;
