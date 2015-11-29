import View from './view';
import Grid from './grid';
import Vector from './vector';

import {directions, charFromElement, randomElement, elementFromChar} from './utils';
import actionTypes from './actiontypes';

class World {
  constructor(map, legend) {
    var grid = new Grid(map[0].length, map.length);
    this.grid = grid;
    this.legend = legend;

    map.forEach(function(line, y) {
      for (let x = 0; x < line.length; x++) {
        grid.set(new Vector(x, y), elementFromChar(legend, line[x]));
      }
    });
  }
  toString() {
    let output = "";
    for (let y = 0; y < this.grid.height; y++) {
      for (let x = 0; x < this.grid.width; x++) {
        let element = this.grid.get(new Vector(x, y));
        output += charFromElement(element);
      }
      output += "\n";
    }
    return output;
  }
  turn() {
    var acted = [];
    var self = this;
    var act = this.letAct;
    this.grid.forEach(function(critter, vector) {
      if (critter && critter.act && acted.indexOf(critter) === -1) {
        acted.push(critter);
        act(critter, vector, self);
      }
    });
  }
  letAct(critter, vector, self) {
    var action = critter.act(new View(self, vector));

    let handled = action &&
      action.type in actionTypes &&
      actionTypes[action.type].call(self, critter, vector, action);

    if (!handled) {
      critter.energy -= 0.2;
      // if Critter out of energy, consider dead
      if (critter.energy <= 0) {
        self.grid.set(vector, null);
      }
    }
    // if critter too old, it should die
    critter.age += 1;
    if (critter.age > critter.genome.maxage) {
      self.grid.set(vector, null);
    }
  }
  checkDestination(action, vector) {
    if (directions.hasOwnProperty(action.direction)) {
      var dest = vector.plus(directions[action.direction]);
      if (this.grid.isInside(dest)) {
        return dest;
      }
    }
  }
}

export default World
