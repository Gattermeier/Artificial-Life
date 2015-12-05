"use strict";
// Vector is a helper class to represent positions on / in the space of the World

class Vector {
  constructor(x,y){
    this.x = x;
    this.y = y;
  }
  plus(otherVector) {
    return new Vector(this.x + otherVector.x, this.y + otherVector.y);
  }
}

module.exports = Vector
