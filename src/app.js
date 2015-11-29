'use strict';

import World from './world';
import Plant from './plant';
import WallFollower from './wallfollower';
import PlantEater from './planteater';

import {directions, charFromElement, randomElement} from './utils';

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
