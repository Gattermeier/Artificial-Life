import Life from './life';

class PlantEater extends Life {
  constructor(parentGenome, energy) {
    super()
    this.energy = energy ? energy : 30;
    this.genome = {
      maxage: parentGenome ? parentGenome.maxage : 500,
      reproduce: parentGenome ? parentGenome.reproduce : 30,
      offspringEnergy: parentGenome ? parentGenome.offspringEnergy : 30
    }
  }
  act(view) {
    super.act()
    let space = view.find(" ");
    let plant = view.find("*");
    if (this.energy > ( this.genome.reproduce + this.genome.offspringEnergy ) && space) {
      return {type: "reproduce", direction: space, genome: this.genome};
    }
    if (plant) {
      return {type: "eat", direction: plant};
    }
    if (space) {
      return {type: "move", direction: space};
    }
  }
}

export default PlantEater
