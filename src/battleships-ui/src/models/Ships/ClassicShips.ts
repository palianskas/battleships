import Ship, {
  Battleship,
  Carrier,
  Cruiser,
  Speedboat,
  Submarine,
} from './Ship';

export interface IClassicShip extends Ship {}

export class ClassicCarrier extends Carrier implements IClassicShip {}

export class ClassicBattleship extends Battleship implements IClassicShip {}

export class ClassicCruiser extends Cruiser implements IClassicShip {}

export class ClassicSubmarine extends Submarine implements IClassicShip {}

export class ClassicSpeedboat extends Speedboat implements IClassicShip {}
