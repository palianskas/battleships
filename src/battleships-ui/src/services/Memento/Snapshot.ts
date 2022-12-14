import Vehicle from '../../models/Vehicle';

export default class Snapshot{
    private vehicle: Vehicle;
    private positionX: number;
    private positionY: number;
    private directionDegrees: number;
    
    constructor(positionX: number, positionY: number, directionDegrees: number, vehicle: Vehicle) {
      this.vehicle = vehicle;
      this.positionX = positionX;
      this.positionY = positionY;
      this.directionDegrees = directionDegrees;
    }
    restore() {
      this.vehicle.setPositionX(this.positionX);
      this.vehicle.setPositionY(this.positionY);
      this.vehicle.setDegrees(this.directionDegrees);
    }
}