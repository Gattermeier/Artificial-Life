const Vector = require('./vector');
const Grid = require('./grid');
const View = require('./view');
const World = require('./world');
const Plant = require('./plant');
const WallFollower = require('./wallfollower');
const PlantEater = require('./planteater');

const directions = require('./utils').directions;
const charFromElement = require('./utils').charFromElement;
const randomElement = require('./utils').randomElement;

const directionNames = "n ne e se s sw w nw".split(" ");

const map = require("raw!../world.txt").split("\n");
function Wall() {}

// World(map, legend)
const valley = new World(
  map ,
  {"#": Wall,
   "O": PlantEater,
   "*": Plant,
   "w": WallFollower
 }
);
window.valley = valley;
