import { ShipClass } from './ShipClass';

export class ShipPart {
  constructor(shipClass: ShipClass) {
    this.shipClass = shipClass;
  }

  isDestroyed = false;
  shipClass: ShipClass;
}
export class ModularShipPart extends ShipPart {
  hp = 10;
}
