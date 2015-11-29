import Life from './life';
import { directionNames } from './utils';

function dirPlus(dir, n) {
  var index = directionNames.indexOf(dir);
  return directionNames[(index + n + 8) % 8];
}

class WallFollower extends Life {
  constructor(parentGenome) {
    super()
    this.dir = "s";
    this.genome.reproduce = parentGenome ? parentGenome.reproduce : 20;
    this.genome.maxage = parentGenome ? parentGenome.maxage : 50;
    this.genome.maxgrowth = parentGenome ? parentGenome.maxgrowth : 30;
    this.age = 0
  }
  act(view) {
    super.act()
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
  }
}


export default WallFollower
