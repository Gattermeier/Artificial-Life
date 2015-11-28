var directions = require('./utils').directions;
var charFromElement = require('./utils').charFromElement;
var randomElement = require('./utils').randomElement;

var View = function(world, vector) {
  this.world = world;
  this.vector = vector;
}
View.prototype.look = function(dir) {
  var target = this.vector.plus(directions[dir]);
  if (this.world.grid.isInside(target)) {
    return charFromElement(this.world.grid.get(target));
  } else {
    return "#";
  }
};
View.prototype.findAll = function(ch) {
  var found = [];
  for (var dir in directions)
    if (this.look(dir) === ch) {
      found.push(dir);
    }
  return found;
};
View.prototype.find = function(ch) {
  var found = this.findAll(ch);
  if (found.length === 0) return null;
  return randomElement(found);
};

module.exports = View
