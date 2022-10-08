'use strict';

const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

// index page
app.get('/', function (req, res) {
  res.sendFile(__dirname + '/src/index.html');
});

io.on('connection', (socket) => {
  socket.on('user join', (payload) => {
    this.user = payload;
    console.log('user join', payload);
    socket.broadcast.emit('user join', payload);
  });

  socket.on('chat message', (payload) => {
    // payload.user = this.user;
    console.log('chat message', payload);
    socket.broadcast.emit('chat message', payload);
  });

  socket.on('disconnect', (payload) => {
    console.log('disconnect', this.user);
    socket.broadcast.emit('user leave', this.user);
  });
});

server.listen(3000);
console.log('Server is listening on port 3000');
