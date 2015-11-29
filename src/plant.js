
var Plant = function(parentGenome, energy) {
  this.age = 0
  this.energy = energy ? energy : 20 + Math.random() * 22;
  this.genome = Object.create(null);
  this.genome.reproduce = parentGenome ? parentGenome.reproduce : 20;
  this.genome.maxage = parentGenome ? parentGenome.maxage : 5000;
  this.genome.maxgrowth = parentGenome ? parentGenome.maxgrowth : 90;
  this.genome.offspringEnergy = parentGenome ? parentGenome.offspringEnergy : 15
}
Plant.prototype.act = function(view) {
  // console.log(this);
  var space = view.find(" ");
  if (this.energy > (this.genome.reproduce + this.genome.offspringEnergy) && space) {
    return {type: "reproduce", direction: space, genome: this.genome};
  }
  if (this.energy < this.genome.maxgrowth) {
    return {type: "grow"};
  }
};

module.exports = Plant
