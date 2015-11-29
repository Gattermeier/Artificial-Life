var PlantEater = function(parentGenome, energy) {
  this.energy = energy ? energy : 30;
  this.age = 0;
  this.genome = Object.create(null);
  this.genome.maxage = 1000;
  // reproduce threshold is not needed, can be unified with offspring energy allocation
  this.genome.reproduce = parentGenome ? parentGenome.reproduce : 30;
  this.genome.offspringEnergy = parentGenome ? parentGenome.offspringEnergy : 30
}
PlantEater.prototype.act = function(view) {
  // console.log('PLANTEATER TURN BEGUN')
  var space = view.find(" ");
  if (this.energy > ( this.genome.reproduce + this.genome.offspringEnergy ) && space) {
    // console.log('PlantEater fires REPRODUCE action: ', this, space);
    return {type: "reproduce", direction: space, genome: this.genome};
  }
  var plant = view.find("*");
  if (plant) {
    // console.log(plant);
    // console.log('PlantEater fires EAT action: ', this);
    return {type: "eat", direction: plant};
  }
  if (space) {
    // console.log(space);
    // console.log('PlantEater fires MOVE action: ', this);
    return {type: "move", direction: space};
  }
};

module.exports = PlantEater
