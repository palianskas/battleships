import Ship, {
  Battleship,
  Carrier,
  Cruiser,
  Speedboat,
  Submarine,
} from './Ship';

export class ShipPart {
  hp = 10;
  isDestroyed = false;
}

export interface IModularShip extends Ship {
  readonly parts: ShipPart[];
}

export class ModularCarrier extends Carrier implements IModularShip {
  readonly parts = constructShipParts(5);
}

export class ModularBattleship extends Battleship implements IModularShip {
  readonly parts = constructShipParts(4);
}

export class ModularCruiser extends Cruiser implements IModularShip {
  readonly parts = constructShipParts(3);
}

export class ModularSubmarine extends Submarine implements IModularShip {
  readonly parts = constructShipParts(3);
}

export class ModularSpeedboat extends Speedboat implements IModularShip {
  readonly parts = constructShipParts(2);
}

function constructShipParts(length: number): ShipPart[] {
  const result = [];

  for (let i = 0; i < length; i++) {
    result.push(new ShipPart());
  }

  return result;
}
