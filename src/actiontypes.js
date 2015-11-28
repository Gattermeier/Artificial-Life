var directions = require('./utils').directions;
var charFromElement = require('./utils').charFromElement;
var randomElement = require('./utils').randomElement;
var elementFromChar = require('./utils').elementFromChar;

var actionTypes = Object.create(null);

actionTypes.grow = function(critter) {
  critter.energy += 0.5;
  return true;
};

actionTypes.move = function(critter, vector, action) {
  var dest = this.checkDestination(action, vector);
  if (dest === null || critter.energy <= 1 || this.grid.get(dest) !== null) {
    return false;
  }
  critter.energy -= 1;
  this.grid.set(vector, null);
  this.grid.set(dest, critter);
  return true;
};

actionTypes.eat = function(critter, vector, action) {
  var dest = this.checkDestination(action, vector);
  var atDest = dest !== null && this.grid.get(dest);
  if (!atDest || atDest.energy === null) {
    return false;
  }
  // Critter get's only 10% of energy of plant
  critter.energy += atDest.energy * 10 / 100;
  // Plant dead
  this.grid.set(dest, null);
  // Maybe plant doesn't get eaten all at once?
  
  // if ( (atDest.energy - atDest.energy *50/100) < 1) {
  //   this.grid.set(dest, null);
  // } else {
  //   atDest = Math.floor(atDest.energy - atDest.energy *50/100);
  //   console.log(atDest);
  //   this.grid.set(dest, atDest);
  // }

  return true;
};

actionTypes.reproduce = function(critter, vector, action) {
  var offspring = elementFromChar(this.legend, critter.originChar);
  var dest = this.checkDestination(action, vector);
  if (dest === null || critter.energy <= 2 * offspring.energy || this.grid.get(dest) !== null) {
    return false;
  }
  critter.energy -= 2 * offspring.energy;
  this.grid.set(dest, offspring);
  return true;
};

module.exports = actionTypes;
