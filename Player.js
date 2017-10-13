
/**
 * BATTLESHIP CHALLENGE
 * 
 * 0 = EMPTY
 * 1 = SHIP
 * 2 = HIT
 * 3 = MISS
 * 
 */

/**
 * Fires missile
 * @param {boolean[][]} field 
 * @param {{ x: number, y: number }[]} previousShots 
 * @param {{ size: number, type: string, x: number, y: number, w: number, h:number }[]} deadShips
 * @returns {{x: number, y: number }}
 */
function fire(field, previousShots, deadShips) {
  // console.log(deadShips)
  return {
    x: Math.floor(Math.random() * 10),
    y: Math.floor(Math.random() * 10)
  }
}

const field = [
  [1, 0, 0, 0, 0, 1, 1, 0, 0, 0],
  [1, 0, 1, 0, 0, 0, 0, 0, 1, 0],
  [1, 0, 1, 0, 1, 1, 1, 0, 1, 0],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 1, 0],
  [0, 0, 0, 0, 1, 1, 1, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 1, 0],
  [0, 0, 0, 1, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 1, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
]


module.exports = {
  name: 'Example',
  fire: fire,
  field: field
}