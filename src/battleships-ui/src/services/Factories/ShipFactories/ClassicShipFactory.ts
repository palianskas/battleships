import {
  ClassicBattleship,
  ClassicCarrier,
  ClassicCruiser,
  ClassicSpeedboat,
  ClassicSubmarine,
  IClassicShip,
} from '../../../models/Ships/ClassicShips';
import { ShipClass } from '../../../models/Ships/ShipClass';
import LoggerService, { PatternTypes } from '../../LoggerService/LoggerService';
import { IShipFactory } from './ShipFactory';

export default class ClassicShipFactory implements IShipFactory {
  private static _intance = new ClassicShipFactory();

  private constructor() {}

  private logger = LoggerService.Instance.getLogger(
    PatternTypes.AbstractFactory
  );

  public static get Instance(): ClassicShipFactory {
    return ClassicShipFactory._intance;
  }

  create(type: ShipClass): IClassicShip {
    this.logger.log(`ClassicShipFactory.create(): type: ${ShipClass[type]}`);

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
