'use strict';

const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer();
const io = new Server(server);

// set the view engine to ejs
app.set('view engine', 'ejs');

// use res.render to load up an ejs view file

// index page
app.get('/', function (req, res) {
  res.render('./chat.ejs');
});

io.on('connection', (socket) => {
  socket.emit('hello from server');

  socket.on('hello from client', (payload) => {});
});

app.listen(3000);
console.log('Server is listening on port 3000');
