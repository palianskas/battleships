import Ship, {
  Battleship,
  Carrier,
  Cruiser,
  Speedboat,
  Submarine,
} from './Ship';

export interface IObservingShip extends Ship {
  readonly reconDistance: number;
}

export class ObservingCarrier extends Carrier implements IObservingShip {
  readonly reconDistance = 7;
}

export class ObservingBattleship extends Battleship implements IObservingShip {
  readonly reconDistance = 5;
}

export class ObservingCruiser extends Cruiser implements IObservingShip {
  readonly reconDistance = 4;
}

export class ObservingSubmarine extends Submarine implements IObservingShip {
  readonly reconDistance = 4;
}

export class ObservingSpeedboat extends Speedboat implements IObservingShip {
  readonly reconDistance = 3;
}
