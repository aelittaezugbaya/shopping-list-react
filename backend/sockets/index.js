const http = require("http");
const socketIo = require("socket.io");
const Mongoose = require("mongoose");
const Models = require("../mongooseModel");
let connections = [];

function websockets(app) {
  const server = http.createServer(app);
  const io = socketIo.listen(server);

  const port = 8000;

  server.listen(port);

  io.sockets.on("connection", socket => {
    connections.push(socket);
    console.log("Connected: %s sockets connected", connections.length);

    socket.on("disconnect", data => {
      connections.splice(connections.indexOf(socket), 1);
      console.log("Disconnected: %s sockets connected", connections.length);
    });

    socket.on("new item", data => {
      console.log("saved: " + data);

      const newItem = Models.Items({
        name: data.name,
        done: false
      });

      newItem.save().then(item => {
        io.sockets.emit("get items");
      });
    });

    socket.on("delete item", data => {
      console.log("Deleted:" + data);

      Models.Items.remove({ _id: data._id }).then(item => {
        io.sockets.emit("get items", data);
      });
    });

    socket.on("change status", data => {
      console.log("Updated:" + data);

      Models.Items.findOne({ _id: data._id })
        .then(item =>
          Models.Items.update({ _id: data._id }, { done: !item.done })
        )
        .then(() => Models.Items.findOne({ _id: data._id }))
        .then(item => {
          io.sockets.emit("update item", item);
        });

      io.sockets.emit("update status", data);
    });

    socket.on("delete all", () => {
      console.log("Delete all");
      Models.Items.remove({}).then(() => {
        io.sockets.emit("get items");
      });
    });
  });
}

module.exports = websockets;
