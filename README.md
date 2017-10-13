# BATTLESHIP CHALLENGE

#### Build the deadliest battleship fleet on the digital ocean!

### Preparing

```bash
npm install
```

### Running the simulation

```bash
npm start
``` 

### Challenge

You are free to update any code within the `Player.js` file at the root of the project.
- Your field will be validated. Remember you can NOT put any ships within 1 space of each other.
- You may place a total of 9 ships.
- The fire function will receive a the known field, known shots, and known dead ships.
- The fire function must return an object with an `x` and `y` property `{ x: 0, y: 0 }`
- The board is a 2D array, 10 x 10.
- Your Player.js file, must export an object with three properties.
```js
modules.exports = {
  name: '',
  fire: function () {},
  field: [[]]
};
```

- An Ai has been provided for you to play against.

### Final Battle
At the end of the exercise we will test all Ai's in a mini tournament

Good Luck!
