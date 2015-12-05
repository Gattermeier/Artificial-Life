"use strict";

import Space from './Space';
import Vector from './Vector';

import { turnEmitter } from './Creator'


// helper function to populate space with elements according to map
function populateSpaceFromLegend(legend, symbol) {
  if (symbol === " " || symbol === null || legend[symbol] === undefined) {
    return null;
  }
  var element = new legend[symbol]();
  element.originSymbol = symbol;
  return element;
}

class World {
  constructor(map, legend) {
    var space = new Space(map[0].length, map.length);
    this.space = space;
    this.legend = legend;

    map.forEach(function(line, y) {
      for (let x = 0; x < line.length; x++) {
        space.set(new Vector(x, y), populateSpaceFromLegend(legend, line[x]));
      }
    });
  }
  turn() {
    console.log('The World is turning..')
    turnEmitter.emit('turn');
  }
}

module.exports = World
