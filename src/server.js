const http = require('http');

const express = require('express');
const Server = require('socket.io');
const Player = require('./models/player');
const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use('/', express.static('public'));

const players = [];
io.on('connection', (socket) => {
  console.log('a user connected');
  const player = new Player(socket.id);
  players.push(player);
  console.log(players);

  socket.on('move', (direction) => {
    player.move(direction);
    console.log(player);
  });

  socket.on('disconnect', () => {
    console.log('user disconnected');

    players.splice(players.indexOf(player), 1);

    console.log(players);
  });
});

server.listen(3000, () => {
  console.log('listening on http://localhost:3000');
});
