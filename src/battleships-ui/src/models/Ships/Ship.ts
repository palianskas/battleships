import Vehicle from '../Vehicle';
import { ShipClass } from './ShipClass';
import { ShipPart } from './ShipPart';

export default abstract class Ship extends Vehicle {
  readonly forwardTravelDistance = 1;
  readonly shipClass!: ShipClass;
  readonly parts!: ShipPart[];
}

export abstract class Carrier extends Ship {
  readonly shipClass = ShipClass.Carrier;
}

export abstract class Battleship extends Ship {
  readonly shipClass = ShipClass.Battleship;
}

export abstract class Cruiser extends Ship {
  readonly shipClass = ShipClass.Cruiser;
}

export abstract class Submarine extends Ship {
  readonly shipClass = ShipClass.Submarine;
}

export abstract class Speedboat extends Ship {
  readonly shipClass = ShipClass.Speedboat;
}
