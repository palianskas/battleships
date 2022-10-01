import {
  ObservingBattleship,
  ObservingCarrier,
  ObservingCruiser,
  ObservingSpeedboat,
  ObservingSubmarine,
  IObservingShip,
} from '../../../models/Ships/ObservingShips';
import { ShipClass } from '../../../models/Ships/ShipClass';
import { IShipFactory } from './ShipFactory';

export default class ObservingShipFactory implements IShipFactory {
  private static _intance = new ObservingShipFactory();

  private constructor() {}

  public static get Instance(): ObservingShipFactory {
    return ObservingShipFactory._intance;
  }

  create(type: ShipClass): IObservingShip {
    switch (type) {
      case ShipClass.Carrier: {
        return new ObservingCarrier();
      }
      case ShipClass.Battleship: {
        return new ObservingBattleship();
      }
      case ShipClass.Cruiser: {
        return new ObservingCruiser();
      }
      case ShipClass.Submarine: {
        return new ObservingSubmarine();
      }
      case ShipClass.Speedboat: {
        return new ObservingSpeedboat();
      }
    }
  }
}
