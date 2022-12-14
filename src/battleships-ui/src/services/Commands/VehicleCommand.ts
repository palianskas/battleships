import Vehicle from '../../models/Vehicle';
import Snapshot from '../Memento/Snapshot';

abstract class VehicleCommand {
  protected vehicle: Vehicle;
  protected lastPosition: { positionX: number; positionY: number };
  private backup: Snapshot | undefined;


  protected constructor(vehicle: Vehicle) {
    this.vehicle = vehicle;
    this.lastPosition = {
      positionX: vehicle.positionX,
      positionY: vehicle.positionY,
    };
  }

  saveLastPosition() {
    this.lastPosition = {
      positionX: this.vehicle.positionX,
      positionY: this.vehicle.positionY,
    };
  }

  undo() {
    this.vehicle.positionX = this.lastPosition.positionX;
    this.vehicle.positionY = this.lastPosition.positionY;
  }
  makeBackUp(){
    const backup = this.vehicle.createSnapshot();
  }
  undoMemento(){
    if(this.backup != null){
      this.backup.restore();
    }
  }

  abstract execute(): Vehicle;
}

class MoveUp extends VehicleCommand {
  execute() {
    this.vehicle.MoveUp;
    return this.vehicle;
  }
}

class MoveDown extends VehicleCommand {
  execute() {
    this.vehicle.MoveDown;
    return this.vehicle;
  }
}

class MoveRight extends VehicleCommand {
  execute() {
    this.vehicle.MoveRight;
    return this.vehicle;
  }
}

class MoveLeft extends VehicleCommand {
  execute() {
    this.vehicle.MoveLeft;
    return this.vehicle;
  }
}
