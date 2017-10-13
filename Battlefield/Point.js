
class Point {
  static get EMPTY () { return 0 }
  static get SHIP () { return 1 }
  static get HIT () { return 2 }
  static get MISS () { return 3 }

  constructor(x, y, result = null) {
    this.x = x;
    this.y = y;
    this.result = result;
  }
}

module.exports = Point;
