const Position = require('./position');

module.exports = class Player {
  constructor(id) {
    this.id = id;
    this.score = 0;
    this.position = new Position();
  }

  move(direction) {
    switch (direction) {
      case 'N':
        this.position.y += 1;
        break;
      case 'S':
        this.position.y -= 1;
        break;
      case 'L':
        this.position.x += 1;
        break;
      case 'O':
        this.position.x -= 1;
        break;
      default:
        break;
    }
  }
};
