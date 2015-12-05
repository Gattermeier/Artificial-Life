"use strict";

import Vector from './Vector';

class Space {
  constructor(width, height) {
    this.space = new Array(width * height)
    this.width = width;
    this.height = height;
  }
  set(vector, value) { // set a position (represented by a vector) in Space to a value (an individual Critter for instance)
    this.space[vector.x + this.width * vector.y] = value;
  }
  get(vector) { // return value (eg: Critter) at postion (vector) in Space
    return this.space[vector.x + this.width * vector.y]
  }
}

module.exports = Space
