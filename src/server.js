const http = require('http');

const express = require('express');
const Server = require('socket.io');
const Player = require('./models/player');
const Fruit = require('./models/fruit');
const { randomWithWeight } = require('./utils');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

const TICK_TIME = (1 / 30) * 1000;
const FRUIT_TIME = 5 * 1000;
const FRUIT_MAX = 4;

const FRUIT_TABLE = [
  { score: 1, weight: 32 },
  { score: 2, weight: 16 },
  { score: 3, weight: 4 },
  { score: 5, weight: 2 },
  { score: 8, weight: 1 },
];

app.use('/', express.static('public'));

const players = [];
const fruits = [];

io.on('connection', (socket) => {
  console.log('a user connected');
  const player = new Player(socket.id);
  players.push(player);
  console.log(players);

  socket.on('move', (direction) => {
    player.move(direction);
    const caughtFruits = fruits.filter((fruit) => player.position.equals(fruit.position));
    caughtFruits.forEach((fruit) => {
      player.score += fruit.score;
      fruits.splice(fruits.indexOf(fruit), 1);
    });
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

setInterval(() => {
  if (fruits.length >= FRUIT_MAX) return; // return early

  const { score } = FRUIT_TABLE[randomWithWeight(FRUIT_TABLE)];
  const fruit = new Fruit(score);

  fruits.push(fruit);
}, FRUIT_TIME);

setInterval(() => {
  io.emit('tick', { players, fruits });
}, TICK_TIME);
