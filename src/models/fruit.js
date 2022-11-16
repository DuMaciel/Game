const Position = require('./position');
const { randomPosition } = require('../utils');

module.exports = class Fruit {
  constructor(score, position = new Position(randomPosition(), randomPosition())) {
    this.score = score;
    this.position = position;
  }
};
