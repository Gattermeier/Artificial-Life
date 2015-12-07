export default class Life {
  constructor() {
    this.age = 0;
    this.genome = Object.create(null);
  }
  age() {
    this.age++;
  }
}
