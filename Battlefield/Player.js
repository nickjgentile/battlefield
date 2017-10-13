
const Ship = require('./Ship');
const Util = require('./Util');
const Field = require('./Field');

class Player {
  /**
   * @param {string} name
   * @param {number[][]} field 
   * @param {function(number[][], { x: number, y: number }[]): {x: number, y: number }} fire
   */
  constructor(name, field, fire) {
    this.name = name;
    this.field = new Field(field)
    this.fire = fire;
    this.ships = this.field.getShips()

    /** @type {{x: number, y: number }[]} */
    this.shots = []
    this.view = new Field()
  }

  validateField() {
    return this.field.validate()
  }
}

module.exports = Player;
