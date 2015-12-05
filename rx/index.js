"use strict";

require('babel-core/register')({
  presets: ['es2015']
});

const util = require('util');
const turnEmitter = require('./Creator').turnEmitter;

const World = require('./World');
const Space = require('./Space');
const Critter = require('./Critter');
// const map = require("raw!./small.txt").split("\n");

const map = ["###########",
             "#    c    #",
             "#  c      #",
             "###########"];

// create new World and populate Space according to map & legend
const world = new World( map, {"c": Critter} );

/* ideally we don't consider a world with turns,
  but time passing being merlely an expression of events happening (constant action and reaction)
  if nothing happens, time does not exist, but for now: let's execute world.turn() instead of world.start()
*/

world.turn();

console.log(util.inspect(world, false, null));
