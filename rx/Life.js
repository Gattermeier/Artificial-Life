class Life {
  constructor() {
    this.age = 0;
    this.genome = Object.create(null);
  }
  act() {
    this.age++;
  }
}
module.exports = Life
