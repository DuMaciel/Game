module.exports = class Position {
  constructor(x = 0, y = 0) {
    this.x = x;
    this.y = y;
  }

  equals(other) {
    return (this.x === other.x && this.y === other.y);
  }
};
