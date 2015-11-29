var directionNames = require('./utils').directionNames

function dirPlus(dir, n) {
  var index = directionNames.indexOf(dir);
  return directionNames[(index + n + 8) % 8];
}

var WallFollower = function(parentGenome) {
  this.dir = "s";
  this.energy = 50;
  this.genome = Object.create(null);
  this.genome.reproduce = parentGenome ? parentGenome.reproduce : 20;
  this.genome.maxage = parentGenome ? parentGenome.maxage : 50;
  this.genome.maxgrowth = parentGenome ? parentGenome.maxgrowth : 30;
  this.age = 0
}

WallFollower.prototype.act = function(view) {
  var start = this.dir;
  if (view.look(dirPlus(this.dir, -3)) !== " ") {
    start = this.dir = dirPlus(this.dir, -2);
  }
  while (view.look(this.dir) !== " ") {
    this.dir = dirPlus(this.dir, 1);
    if (this.dir === start) break;
  }
  var plant = view.find("*");
  if (plant) {
    return {type: "eat", direction: plant};
  }
  return {type: "move", direction: this.dir};
};

module.exports = WallFollower
