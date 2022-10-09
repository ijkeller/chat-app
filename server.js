'use strict';

const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

const chatLog = [];

// index page
app.get('/', function (req, res) {
  res.sendFile(__dirname + '/src/index.html');
});

io.on('connection', (socket) => {
  socket.on('user join', (payload) => {
    console.log('socket id:', socket.id);
    this.user = payload;
    console.log('user join', payload);
    socket.broadcast.emit('user join', payload);
    io.to(socket.id).emit('chatlog', chatLog);
  });

  socket.on('chat message', (payload) => {
    //! line causing problems payload.user = this.user;
    console.log('chat message', payload);
    chatLog.push(payload);
    socket.broadcast.emit('chat message', payload);
  });

  socket.on('disconnect', (payload) => {
    console.log('disconnect', this.user);
    socket.broadcast.emit('user leave', this.user);
  });
  socket.on('typing', (payload) => {
    console.log(`${payload.user} is typing...`);
    socket.broadcast.emit('typing', payload);
  });
});

server.listen(3000);
console.log('Server is listening on port 3000');

// log each message to the server
// hub has a running list of each socket that is online
//
