import ShipPartFactory, {
  ShipPartType,
} from '../../services/Factories/ShipFactories/ShipPartFactory/ShipPartFactory';
import { Visitor } from '../../services/Visitor/Visitor';
import Ship, {
  Battleship,
  Carrier,
  Cruiser,
  Speedboat,
  Submarine,
} from './Ship';
import { ShipClass } from './ShipClass';

export interface IClassicShip extends Ship {
  accept(visitor: Visitor): void;
}

export class ClassicCarrier extends Carrier implements IClassicShip {
  readonly parts = new ShipPartFactory().createParts(
    5,
    ShipPartType.Classic,
    ShipClass.Carrier
  );
  public accept(visitor: Visitor): void {
    visitor.visitClassicCarrier(this);
  }
}

export class ClassicBattleship extends Battleship implements IClassicShip {
  readonly parts = new ShipPartFactory().createParts(
    4,
    ShipPartType.Classic,
    ShipClass.Battleship
  );
  public accept(visitor: Visitor): void {
    visitor.visitClassicBattleship(this);
  }
}

export class ClassicCruiser extends Cruiser implements IClassicShip {
  readonly parts = new ShipPartFactory().createParts(
    3,
    ShipPartType.Classic,
    ShipClass.Cruiser
  );
  public accept(visitor: Visitor): void {
    visitor.visitClassicCruiser(this);
  }
}

export class ClassicSubmarine extends Submarine implements IClassicShip {
  readonly parts = new ShipPartFactory().createParts(
    3,
    ShipPartType.Classic,
    ShipClass.Submarine
  );
  public accept(visitor: Visitor): void {
    visitor.visitClassicSubmarine(this);
  }
}

export class ClassicSpeedboat extends Speedboat implements IClassicShip {
  readonly parts = new ShipPartFactory().createParts(
    2,
    ShipPartType.Classic,
    ShipClass.Speedboat
  );
  public accept(visitor: Visitor): void {
    visitor.visitClassicSpeedboat(this);
  }
}
