import ShipPartFactory from '../../services/Factories/ShipFactories/ShipPartFactory/ShipPartFactory';
import Ship, {
  Battleship,
  Carrier,
  Cruiser,
  Speedboat,
  Submarine,
} from './Ship';
import { ShipClass } from './ShipClass';

export interface IObservingShip extends Ship {
  readonly reconDistance: number;
}

export class ObservingCarrier extends Carrier implements IObservingShip {
  readonly parts = new ShipPartFactory().createParts(
    5,
    false,
    ShipClass.Carrier
  );
  readonly reconDistance = 7;
}

export class ObservingBattleship extends Battleship implements IObservingShip {
  readonly parts = new ShipPartFactory().createParts(
    4,
    false,
    ShipClass.Battleship
  );
  readonly reconDistance = 5;
}

export class ObservingCruiser extends Cruiser implements IObservingShip {
  readonly parts = new ShipPartFactory().createParts(
    3,
    false,
    ShipClass.Cruiser
  );
  readonly reconDistance = 4;
}

export class ObservingSubmarine extends Submarine implements IObservingShip {
  readonly parts = new ShipPartFactory().createParts(
    3,
    false,
    ShipClass.Submarine
  );
  readonly reconDistance = 4;
}

export class ObservingSpeedboat extends Speedboat implements IObservingShip {
  readonly parts = new ShipPartFactory().createParts(
    2,
    false,
    ShipClass.Speedboat
  );
  readonly reconDistance = 3;
}
