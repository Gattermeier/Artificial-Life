var Vector = require('./vector');

var directions = {
  "n":  new Vector( 0, -1),
  "ne": new Vector( 1, -1),
  "e":  new Vector( 1,  0),
  "se": new Vector( 1,  1),
  "s":  new Vector( 0,  1),
  "sw": new Vector(-1,  1),
  "w":  new Vector(-1,  0),
  "nw": new Vector(-1, -1)
};

var directionNames = "n ne e se s sw w nw".split(" ");

var charFromElement = function(element) {
  return (element === null || element === undefined) ? " " : element.originChar;
}

var randomElement = function(array) {
  return array[Math.floor(Math.random() * array.length)];
}

var elementFromChar = function(legend, ch) {
  if (ch === " " || legend[ch] === undefined) {
    return null;
  }
  var element = new legend[ch]();
  element.originChar = ch;
  return element;
}

exports.directions = directions;
exports.charFromElement = charFromElement;
exports.randomElement = randomElement;
exports.elementFromChar = elementFromChar;
exports.directionNames = directionNames;
