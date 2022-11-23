export default abstract class Vehicle {
  positionX = 0;
  positionY = 0;
  directionDegrees = 0;
  constructor(positionX = 0, positionY = 0, directionDegrees = 0) {
    this.positionX = positionX;
    this.positionY = positionY;
    this.directionDegrees = directionDegrees;
  }

  MoveUp(this: any) {
    this.positionY += 1;
    return this.vehicle;
  }

  MoveDown(this: any) {
    this.positionY -= 1;
    return this.vehicle;
  }

  MoveRight(this: any) {
    this.positionX += 1;
    return this.vehicle;
  }

  MoveLeft(this: any) {
    this.positionX -= 1;
    return this.vehicle;
  }
}
