import {
  ObservingBattleship,
  ObservingCarrier,
  ObservingCruiser,
  ObservingSpeedboat,
  ObservingSubmarine,
  IObservingShip,
} from '../../../models/Ships/ObservingShips';
import { ShipClass } from '../../../models/Ships/ShipClass';
import LoggerService, { PatternTypes } from '../../LoggerService/LoggerService';
import { IShipFactory } from './ShipFactory';

export default class ObservingShipFactory implements IShipFactory {
  private static _intance = new ObservingShipFactory();

  private constructor() {}

  private logger = LoggerService.Instance.getLogger(
    PatternTypes.AbstractFactory
  );

  public static get Instance(): ObservingShipFactory {
    return ObservingShipFactory._intance;
  }

  create(type: ShipClass): IObservingShip {
    this.logger.log(`ObservingShipFactory.create(): type: ${ShipClass[type]}`);

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
