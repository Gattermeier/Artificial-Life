import Life from './life';

class Plant extends Life {
  constructor(parentGenome, energy) {
    super()
    this.energy = energy ? energy : 20 + Math.random() * 22;
    this.genome = {
      reproduce: parentGenome ? parentGenome.reproduce : 20,
      maxage: parentGenome ? parentGenome.maxage : 1000,
      maxgrowth: parentGenome ? parentGenome.maxgrowth : 90,
      offspringEnergy : parentGenome ? parentGenome.offspringEnergy : 15
    }
  }
  grow() {
    this.energy += .5;
  }
  act(view) {
    super.act();
    let space = view.find(" ");
    if (this.energy > (this.genome.reproduce + this.genome.offspringEnergy) && space) {
      return {type: "reproduce", direction: space, genome: this.genome};
    }
    if (this.energy < this.genome.maxgrowth) {
      return {type: "grow"};
    }
  }
}

export default Plant
