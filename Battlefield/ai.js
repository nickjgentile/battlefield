
/**
 * Fires missile
 * @param {boolean[][]} field 
 * @param {{ x: number, y: number }[]} previousShots 
 * @returns {{x: number, y: number }}
 */
function random(field, previousShots) {
  // return { x: 0, y: 0 };
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
  name: 'Ai',
  fire: random,
  field
}