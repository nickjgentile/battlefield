
/**
 * Returns cell array
 * @param {number[][]} field 
 */
function getCells(field) {
  var ships = [4, 3, 3, 2, 2, 2, 1, 1, 1, 1];
  var cells = [];
  var cellCounter = 0;


}

function validateBattlefield(field) {
  // console.log(field);
  var ships = [4, 3, 3, 2, 2, 2, 1, 1, 1, 1];
  var cells = []
  var cellCounter = 0
  
  field.forEach((row, y) => {
    row.forEach((point, x) => {
      if (point) {
        ships.forEach((ship, shipIndex) => {
          // check right
          var right = true
          for (var w = 0; w < ship; w++) {
            right = right && field[y][x + w]
          }
          
          // check down
          var down = true
          for (var h = 0; h < ship; h++) {
            down = down && field[y + h][x]
          }
          
          if (right) {
            cells.push({ ship, x, y, h: 1, w: ship, dir: 'right', id: cellCounter++ })
            for (var w = 0; w < ship; w++) {
              field[y][x + w] = 0
            }
          } else if (down) {
            cells.push({ ship, x, y, h: ship, w: 1, dir: 'down', id: cellCounter++ })
            for (var h = 0; h < ship; h++) {
              field[y + h][x] = 0
            }
          }
          
          if (right || down) {
            ships.splice(shipIndex, 1)
          }
        })
      }
    })
  })
  // console.log('assigning ships');
  
  if (cells.length !== 10) {
    // console.log('didn\'t find enough ships');
    return false;
  }

  for (var i = 0; i < field.length; i++) {
    for (var j = 0; j < field[i].length; j++) {
       if (field[i][j]) {
        //  console.log('found too many ships');
         return false;
       }
    }
  }
  
  console.log('just enough ships');
  console.log(cells);
  
  let collision = false;
  cells.forEach((cell) => {
    const top = cell.y - 1
    const left = cell.x - 1;
    const bottom = cell.dir === 'down' ? cell.y + cell.h : cell.y + 1;
    const right = cell.dir === 'right' ? cell.x + cell.w : cell.x + 1;
    
    cells.forEach((otherCell) => {
      const { x, y, w, h } = otherCell
      const other = {
        top: otherCell.y,
        left: otherCell.x,
        bottom: otherCell.dir === 'down' ? otherCell.y + otherCell.h - 1 : otherCell.y,
        right: otherCell.dir === 'right' ? otherCell.x + otherCell.w - 1 : otherCell.x
      };
      if (cell.id === otherCell.id) return
      if (collision) return

      if (
        left <= other.right &&
        right >= other.left &&
        top <= other.bottom &&
        bottom >= other.top
      ) {
        
        // console.log(left, '<=', other.right)
        // console.log(right, '>=', other.left)
        // console.log(top, '<=', other.bottom)
        // console.log(bottom, '>=', other.top)

        // console.log(cell, otherCell)
        // console.log({ top, left, bottom, right }, other)
        collision = true;
      }
      
    })
  })

  // console.log('result', !collision);
  return !collision;
}

// var test = validateBattlefield(
// [ [ 1, 0, 0, 0, 0, 1, 1, 0, 0, 0 ],
//   [ 1, 0, 1, 0, 0, 0, 0, 0, 1, 0 ],
//   [ 1, 0, 1, 0, 1, 1, 1, 0, 1, 0 ],
//   [ 1, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
//   [ 0, 0, 0, 0, 0, 0, 0, 0, 1, 0 ],
//   [ 0, 0, 0, 0, 1, 1, 1, 0, 0, 0 ],
//   [ 0, 0, 0, 0, 0, 0, 0, 0, 1, 0 ],
//   [ 0, 0, 0, 1, 0, 0, 0, 0, 0, 0 ],
//   [ 0, 0, 0, 0, 0, 0, 0, 1, 0, 0 ],
//   [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ] ]
// )

var initial = validateBattlefield(
[ [1, 0, 0, 0, 0, 1, 1, 0, 0, 0],
  [1, 0, 1, 0, 0, 0, 0, 0, 1, 0],
  [1, 0, 1, 0, 1, 1, 1, 0, 1, 0],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 1, 0],
  [0, 0, 0, 0, 1, 1, 1, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 1, 0],
  [0, 0, 0, 1, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 1, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]]
)

// console.log(test, false);
console.log('should be true:', initial);
