
const Ship = require('./Ship')

const defaultField = [
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
]

class Field {
  constructor(field = defaultField) {
    /** @type {number[][]} */
    this.field = JSON.parse(JSON.stringify(field))
  }

  /**
   * Returns copy of current field
   * @returns {number[][]}
   */
  getCopy() {
    return JSON.parse(JSON.stringify(this.field))
  }

  /**
   * Gets value at given position
   * @param {number} x 0 - 9
   * @param {number} y 0 - 9
   */
  get(x, y) {
    return this.field[y][x]
  }

  /**
   * 
   * @param {number} x 0 - 9
   * @param {number} y 0 - 9
   * @param {number} value  0 - 4
   */
  set(x, y, value) {
    return this.field[y][x] = value
  }

  /**
   * Loops through every item in 2d Array
   * @param {number[][]} field 
   * @param {(x: number) => {}} cb 
   */
  forEach(cb) {
    for (let i = 0; i < this.field.length; i++) {
      for (let j = 0; j < this.field[i].length; j++) {
        cb(this.field[i][j])
      }
    }
  }


  /**
   * Return Ship array
   * @returns {Ship[]}
   */
  getShips() {
    /** @type {number[][]} */
    const field = this.getCopy();
    /** @type {Ship[]} */
    const ships = [];

    const availableShips = [4, 3, 3, 2, 2, 2, 1, 1, 1, 1];
    let cellCounter = 0;

    field.forEach((row, y) => {
      row.forEach((point, x) => {
        if (point) {
          availableShips.forEach((ship, shipIndex) => {
            let right = true;
            var down = true;
            
            // check right
            for (let w = 0; w < ship; w++) {
              right = right && field[y][x + w];
            }
            
            // check down
            for (var h = 0; h < ship; h++) {
              down = down && field[y + h][x];
            }
            
            if (right) {
              // push new ship
              ships.push(new Ship(cellCounter++, ship, x, y, ship, 1, 'right'));
              // remove ship from field
              for (var w = 0; w < ship; w++) {
                field[y][x + w] = 0;
              }
            } else if (down) {
              // push new ship
              ships.push(new Ship(cellCounter++, ship, x, y, 1, ship, 'down'));
              // remove ship from field
              for (var h = 0; h < ship; h++) {
                field[y + h][x] = 0;
              }
            }
            
            if (right || down) {
              // remove ship from available ships
              availableShips.splice(shipIndex, 1);
            }
          })
        }
      })
    })

    return ships;
  }

  /**
   * Check for valid ship positions and count
   * @returns {boolean}
   */
  validate() {
    const field = this.field
    const ships = this.getShips()
    let counter = 0;
    let collision = false;

    // check for enough ships
    if (ships.length !== 10) return false
    
    // count correct amount of target-able areas
    this.forEach(status => { if (status) counter++ })
    if (counter > 20) return false;

    // loop through ships, check for 1 space of padding
    for (var i = 0; i < ships.length; i++) {
      const ship = ships[i];

      ships.forEach((otherShip) => {
        if (ship.id === otherShip.id) return
        if (collision) return;

        collision = ship.collides(otherShip)
      })

      if (collision) break;
    }

    return !collision;
  }
}

module.exports = Field
