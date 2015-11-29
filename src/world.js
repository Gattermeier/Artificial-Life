var View = require('./view');
var Grid = require('./grid');
var Vector = require('./vector');
var directions = require('./utils').directions;
var charFromElement = require('./utils').charFromElement;
var randomElement = require('./utils').randomElement;
var elementFromChar = require('./utils').elementFromChar;

var actionTypes = require('./actiontypes');

var World = function(map, legend) {
  var grid = new Grid(map[0].length, map.length);
  this.grid = grid;
  this.legend = legend;

  map.forEach(function(line, y) {
    for (var x = 0; x < line.length; x++) {
      grid.set(new Vector(x, y), elementFromChar(legend, line[x]));
    }
  });
}

World.prototype.toString = function() {
  var output = "";
  for (var y = 0; y < this.grid.height; y++) {
    for (var x = 0; x < this.grid.width; x++) {
      var element = this.grid.get(new Vector(x, y));
      output += charFromElement(element);
    }
    output += "\n";
  }
  return output;
};

World.prototype.turn = function() {
  var acted = [];
  this.grid.forEach(function(critter, vector) {
    // console.log(vector , ' Vector of Crittor: ', critter)
    if (critter.act && acted.indexOf(critter) === -1) {
      acted.push(critter);
      this.letAct(critter, vector);
    }
  }, this);
};

World.prototype.letAct = function(critter, vector) {

  var action = critter.act(new View(this, vector));
  // if (action.type === 'reproduce') {
  //   console.log('Critter act returns:', action, ' from Critter: ', critter);
  // }

  var handled = action &&
    action.type in actionTypes &&
    // console.log('this: ',this, '' )
    actionTypes[action.type].call(this, critter, vector, action);

  if (!handled) {
    critter.energy -= 0.2;
    // if Critter out of energy, consider dead
    if (critter.energy <= 0) {
      this.grid.set(vector, null);
    }
  }
  // if critter too old, it should die
  critter.age += 1;
  if (critter.age > critter.genome.maxage) {
    this.grid.set(vector, null);
  }
};

World.prototype.checkDestination = function(action, vector) {
  if (directions.hasOwnProperty(action.direction)) {
    var dest = vector.plus(directions[action.direction]);
    if (this.grid.isInside(dest)) {
      return dest;
    }
  }
};

module.exports = World
