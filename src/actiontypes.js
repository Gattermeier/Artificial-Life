// var directions = require('./utils').directions;
// var charFromElement = require('./utils').charFromElement;
// var randomElement = require('./utils').randomElement;
// var createIndividualFromSymbol = require('./utils').createIndividualFromSymbol;
// var elementFromChar = require('./utils').elementFromChar;

import {directions, charFromElement, randomElement, elementFromChar} from './utils';


// var lowest = 15,
//     highest = 15;
var mutate = function(parentGenome) {
  var childGenome = Object.create(null);
  for (let key in parentGenome) {
    childGenome[key] = parentGenome[key];
    var chance = Math.random();
    if (chance < .05) {
      childGenome[key] = parentGenome[key] - 1;
      // lowest = childGenome[key] < lowest ? childGenome[key] : lowest;
    }
    if (chance > .95) {
      childGenome[key] = parentGenome[key] + 1;
      // highest = childGenome[key] > highest ? childGenome[key] : highest;
    }
  }
  return childGenome
}

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
  critter.energy -= 1 ; //+ Math.floor(critter.energy*20/100)
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
  // Critter get's only % of energy of plant eaten
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
  // Mutate genome
  var offspringGenome = mutate(action.genome);
  // console.log(critter.genome, offspringGenome);
  // console.log(lowest,highest);

  // Create new offspring, use critter.originChar as template with world legend for constructor function
  var offspring = elementFromChar(this.legend, critter.originChar, offspringGenome, critter.genome.offspringEnergy);
  // console.log(critter, offspring);
  var dest = this.checkDestination(action, vector);
  if (dest === null || critter.energy <= 10 + offspring.energy || this.grid.get(dest) !== null) {
    // console.log('could not reproduce... Dest:', dest, '' )
    return false;
  }
  critter.energy -= 2 * offspring.energy;
  this.grid.set(dest, offspring);
  return true;
};

export default actionTypes
// module.exports = actionTypes;
