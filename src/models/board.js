const { randomWithWeight, randomPosition } = require('../utils');
const Fruit = require('./fruit');
const Position = require('./position');

module.exports = class Board {
  constructor(width, heigth, fruitConfig) {
    this.width = width;
    this.heigth = heigth;
    this.fruitConfig = fruitConfig;
    this.players = [];
    this.fruits = [];
    setInterval(() => this.generateFruit(), this.fruitConfig.time);
  }

  generateFruit() {
    if (this.fruits.length >= this.fruitConfig.fruitMax) return; // return early

    const { score } = this.fruitConfig.table[randomWithWeight(this.fruitConfig.table)];
    const position = new Position(randomPosition(this.width), randomPosition(this.heigth));
    const fruit = new Fruit(score, position);
    this.fruits.push(fruit);
  }
};
