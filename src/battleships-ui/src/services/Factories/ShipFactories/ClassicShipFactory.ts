import {
  ClassicBattleship,
  ClassicCarrier,
  ClassicCruiser,
  ClassicSpeedboat,
  ClassicSubmarine,
  IClassicShip,
} from '../../../models/Ships/ClassicShips';
import { ShipClass } from '../../../models/Ships/ShipClass';
import { IShipFactory } from './ShipFactory';

export default class ClassicShipFactory implements IShipFactory {
  private static _intance = new ClassicShipFactory();

  private constructor() {}

  public static get Instance(): ClassicShipFactory {
    return ClassicShipFactory._intance;
  }

  create(type: ShipClass): IClassicShip {
    switch (type) {
      case ShipClass.Carrier: {
        return new ClassicCarrier();
      }
      case ShipClass.Battleship: {
        return new ClassicBattleship();
      }
      case ShipClass.Cruiser: {
        return new ClassicCruiser();
      }
      case ShipClass.Submarine: {
        return new ClassicSubmarine();
      }
      case ShipClass.Speedboat: {
        return new ClassicSpeedboat();
      }
    }
  }
}
