export default abstract class Vehicle {
  positionX = 0;
  positionY = 0;
    directionDegrees = 0;
    constructor(positionX = 0, positionY = 0, directionDegrees = 0) {
        this.positionX = positionX;
        this.positionY = positionY;
        this.directionDegrees = directionDegrees;
    }
}
