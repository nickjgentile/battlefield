
const playerOne = require('./Player');
const playerTwo = require('./Battlefield/ai');
const Battlefield = require('./Battlefield/Battlefield');

var game = new Battlefield(playerOne, playerTwo)

var counter = 0
var speed = 0 // milliseconds

function run() {
  console.log('\n\n')
  const gameOver = game.step();
  counter++

  if (!gameOver && counter < 10000) {
    setTimeout(run, speed)
  } else {
    const winner = game.turn ? game.p2 : game.p1
    const loser = !game.turn ? game.p2 : game.p1

    console.log('\n\n')
    console.log('GAME OVER', winner.name, 'wins');
    console.log('Iterations:', counter);
  }
}

run();
