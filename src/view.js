// var directions = require('./utils').directions;
// var charFromElement = require('./utils').charFromElement;
// var randomElement = require('./utils').randomElement;

import {directions, charFromElement, randomElement} from './utils';

class View {
  constructor(world, vector) {
    this.world = world;
    this.vector = vector;
  }
  look(dir) {
    let target = this.vector.plus(directions[dir]);
    if (this.world.grid.isInside(target)) {
      return charFromElement(this.world.grid.get(target));
    } else {
      return "#";
    }
  }
  findAll(ch) {
    let found = [];
    for (let dir in directions)
      if (this.look(dir) === ch) {
        found.push(dir);
      }
    return found;
  }
  find(ch) {
    let found = this.findAll(ch);
    if (found.length === 0) return null;
    return randomElement(found);
  }
}

export default View
