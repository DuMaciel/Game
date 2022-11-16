const http = require('http');

const express = require('express');
const Server = require('socket.io');
const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use('/', express.static('public'));

io.on('connection', (socket) => {
  console.log('a user connected');
  socket.on('disconnect', () => {
    console.log('user disconnected');

  });
});

server.listen(3000, () => {
  console.log('listening on http://localhost:3000');
});
