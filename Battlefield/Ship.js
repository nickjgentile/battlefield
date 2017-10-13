
const { copy } = require('./Util');

const types = [
  'Submarine',
  'Destroyer',
  'Cruiser',
  'Battleship',
]

class Ship {
  /**
   * Ship
   * @param {number} id
   * @param {number} size
   * @param {number} x
   * @param {number} y
   * @param {number} w
   * @param {number} h
   * @param {string} direction
   */
  constructor(id, size, x, y, w, h, direction) {
    this.id = id;
    this.size = size;
    this.type = types[size - 1]
    this.direction = direction;
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    /** @type {{ x: number, y: number }[]} */
    this.hits = []
    this.health = this.size;
  }

  /**
   * marks hit
   * @param {{ x:number, y:number }} point
   */
  markHit(point) {
    const newHit = this.hits.every(hit => !(hit.x === point.x && hit.y === point.y))
    if (newHit) {
      this.hits.push(point);
      this.health--
    }
  }

  

  /**
   * colliding check with padding
   * @param {Ship} ship
   * @returns {boolean}
   */
  collides(ship) {
    const bounds = {
      top: this.y - 1,
      left: this.x - 1,
      bottom: this.dir === 'down' ? this.y + this.h : this.y + 1,
      right: this.dir === 'right' ? this.x + this.w : this.x + 1
    }

    const other = {
      top: ship.y,
      left: ship.x,
      bottom: ship.direction === 'down' ? ship.y + ship.h - 1 : ship.y,
      right: ship.direction === 'right' ? ship.x + ship.w - 1 : ship.x
    }

    return (
      bounds.left <= other.right &&
      bounds.right >= other.left &&
      bounds.top <= other.bottom &&
      bounds.bottom >= other.top
    )
  }

  /**
   * check for point within ship
   * @param {{ x: number, y: number }} point
   */
  contains(point) {
    const bounds = {
      top: this.y,
      left: this.x,
      bottom: this.y + this.h -1,
      right: this.x + this.w -1
    }

    return (
      bounds.left <= point.x &&
      bounds.right >= point.x &&
      bounds.top <= point.y &&
      bounds.bottom >= point.y
    )
  }
}

module.exports = Ship;
