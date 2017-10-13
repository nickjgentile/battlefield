
/**
 * @typedef Ai
 * @property field {number[][]}
 * @property fire {function(number[][], { x: number, y: number }[]): {x: number, y: number }}
 */

const Util = require('./Util');
const Ship = require('./Ship');
const Player = require('./Player');

const EMPTY = 0
const SHIP = 1
const HIT = 2
const MISS = 3

class Battlefield {
  /**
   * Creates a new game
   * @param {Ai} p1
   * @param {Ai} p2 
   */
  constructor(p1, p2) {
    this.p1 = new Player(p1.name, p1.field, p1.fire)
    this.p2 = new Player(p2.name, p2.field, p2.fire)

    const p1Valid = this.p1.validateField()
    const p2Valid = this.p2.validateField()

    if (!p1Valid && !p2Valid) {
      throw Error('Both player fields are invalid, double loss')
    } else if (!p1Valid && p2Valid) {
      throw Error(`${this.p1.name} field invalid, ${this.p2.name} wins`)
    } else if (p1Valid && !p2Valid) {
      throw Error(`${this.p2.name} field invalid, ${this.p1.name} wins`)
    } else {
      console.log(this.p1.name, 'vs', this.p2.name)
    }

    this.turn = !!(Math.round(Math.random()))
    
  }

  step() {
    const player = this.turn ? this.p2 : this.p1;
    const opponent = !this.turn ? this.p2 : this.p1;
    this.turn = !this.turn;

    const deadShips = opponent.ships
      .filter(ship => ship.health === 0 )
      .map(({ size, type, x, y, w, h }) => ({ size, type, x, y, w, h }))

    // get new fire point
    const point = player.fire(player.view.getCopy(), player.shots, deadShips)
    console.log(player.name, 'fires at', point);

    // determine hit
    const hitShip = opponent.ships.reduce((hitShip, ship) => {
      if (hitShip) return hitShip
      if (ship.contains(point)) return ship 
      return null
    }, null)

    if (hitShip) {
      console.log(opponent.name, 'is hit!')
      // update opponent state
      hitShip.markHit(point)
      opponent.field.set(point.x, point.y, HIT)

      // update player state
      player.view.set(point.x, point.y, HIT)
      point.result = HIT
      player.shots.push(point)

      var shipsLeft = 0
      opponent.ships.forEach(ship => {
        // console.log(ship.type, ship.hits.length);
        // console.log(ship.type, ship.health);
        if (ship.health) {
          shipsLeft++
        }
      })
      console.log(`${opponent.name} has ${shipsLeft} ships left!`);

      // check for win condition
      const stillAlive = opponent.ships.reduce((alive, ship) => alive ? alive : ship.health > 0, false);

      return !stillAlive
    } else {
      console.log('it\'s a miss');
      // update player state
      player.view.set(point.x, point.y, MISS)
      point.result = MISS
      player.shots.push(point)
      return false
    }
  }
}

module.exports = Battlefield
