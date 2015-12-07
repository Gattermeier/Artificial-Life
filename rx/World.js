"use strict";

import Space from './Space';
import Vector from './Vector';
var Rx = require('rx');

import { turnEmitter, critterEmitter } from './Creator'


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

    // populate world with life and matter
    map.forEach(function(line, y) {
      for (let x = 0; x < line.length; x++) {
        space.set(new Vector(x, y), populateSpaceFromLegend(legend, line[x]));
      }
    });

    // subscribe to general "life" events emitted from living beings
    this.life = new Rx.Observable.fromEvent(critterEmitter, 'life');
    this.life.subscribe((origin) => {
      console.log('living event captured')
      origin.age++;
      // notify all (or specific) living beings to "tell" => what's your status?
      turnEmitter.emit('tell', origin.id);
    })
  }
  turn() {
    console.log('The World is turning..')
    turnEmitter.emit('turn');
  }
}

module.exports = World
