import ShipPartFactory from '../../services/Factories/ShipFactories/ShipPartFactory/ShipPartFactory';
import Ship, {
  Battleship,
  Carrier,
  Cruiser,
  Speedboat,
  Submarine,
} from './Ship';
import { ModularShipPart } from './ShipPart';

export interface IModularShip extends Ship {
  readonly parts: ModularShipPart[];
}

export class ModularCarrier extends Carrier implements IModularShip {
  readonly parts = new ShipPartFactory().createParts(
    5,
    true
  ) as ModularShipPart[];
}

export class ModularBattleship extends Battleship implements IModularShip {
  readonly parts = new ShipPartFactory().createParts(
    4,
    true
  ) as ModularShipPart[];
}

export class ModularCruiser extends Cruiser implements IModularShip {
  readonly parts = new ShipPartFactory().createParts(
    3,
    true
  ) as ModularShipPart[];
}

export class ModularSubmarine extends Submarine implements IModularShip {
  readonly parts = new ShipPartFactory().createParts(
    3,
    true
  ) as ModularShipPart[];
}

export class ModularSpeedboat extends Speedboat implements IModularShip {
  readonly parts = new ShipPartFactory().createParts(
    2,
    true
  ) as ModularShipPart[];
}
