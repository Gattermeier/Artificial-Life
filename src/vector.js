class Vector {
  constructor(x,y){
    this.x = x;
    this.y = y;
  }
  plus(otherVector) {
    return new Vector(this.x + otherVector.x, this.y + otherVector.y);
  }
}

export default Vector
