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
// console.log(util.inspect(world, false, null));


// turnEmitter.emit('turn');
world.turn();
