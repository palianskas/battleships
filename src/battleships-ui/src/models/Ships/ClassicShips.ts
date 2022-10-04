import ShipPartFactory from '../../services/Factories/ShipFactories/ShipPartFactory/ShipPartFactory';
import Ship, {
  Battleship,
  Carrier,
  Cruiser,
  Speedboat,
  Submarine,
} from './Ship';

export interface IClassicShip extends Ship {}

export class ClassicCarrier extends Carrier implements IClassicShip {
  readonly parts = ShipPartFactory.createParts(5, false);
}

export class ClassicBattleship extends Battleship implements IClassicShip {
  readonly parts = ShipPartFactory.createParts(4, false);
}

export class ClassicCruiser extends Cruiser implements IClassicShip {
  readonly parts = ShipPartFactory.createParts(3, false);
}

export class ClassicSubmarine extends Submarine implements IClassicShip {
  readonly parts = ShipPartFactory.createParts(3, false);
}

export class ClassicSpeedboat extends Speedboat implements IClassicShip {
  readonly parts = ShipPartFactory.createParts(2, false);
}
