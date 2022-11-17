const http = require('http');

const express = require('express');
const Server = require('socket.io');
const Board = require('./models/board');
const Player = require('./models/player');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

const TICK_TIME = (1 / 30) * 1000;

const fruitConfig = {
  fruitMax: 4,
  time: 5 * 1000,
  table: [
    { score: 1, weight: 32 },
    { score: 2, weight: 16 },
    { score: 3, weight: 4 },
    { score: 5, weight: 2 },
    { score: 8, weight: 1 },
  ],
};

app.use('/', express.static('public'));

const board = new Board(10, 20, fruitConfig);

io.on('connection', (socket) => {
  console.log('a user connected');
  const player = new Player(socket.id);
  board.players.push(player);
  console.log(board.players);

  socket.on('move', (direction) => {
    player.move(direction);
    const caughtFruits = board.fruits.filter((fruit) => player.position.equals(fruit.position));
    caughtFruits.forEach((fruit) => {
      player.score += fruit.score;
      board.fruits.splice(board.fruits.indexOf(fruit), 1);
    });
  });

  socket.on('disconnect', () => {
    console.log('user disconnected');

    board.players.splice(board.players.indexOf(player), 1);

    console.log(board.players);
  });
});

server.listen(3000, () => {
  console.log('listening on http://localhost:3000');
});

setInterval(() => {
  const { _fruitConfig, ...data } = board;
  io.emit('tick', data);
}, TICK_TIME);
