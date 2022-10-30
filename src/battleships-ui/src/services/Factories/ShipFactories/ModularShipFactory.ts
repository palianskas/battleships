import {
  ModularBattleship,
  ModularCarrier,
  ModularCruiser,
  ModularSpeedboat,
  ModularSubmarine,
  IModularShip,
} from '../../../models/Ships/ModularShips';
import { ShipClass } from '../../../models/Ships/ShipClass';
import LoggerService, { PatternTypes } from '../../LoggerService/LoggerService';
import { IShipFactory } from './ShipFactory';

export default class ModularShipFactory implements IShipFactory {
  private static _intance = new ModularShipFactory();

  private constructor() {}

  private logger = LoggerService.Instance.getLogger(
    PatternTypes.AbstractFactory
  );

  public static get Instance(): ModularShipFactory {
    return ModularShipFactory._intance;
  }

  create(type: ShipClass): IModularShip {
    this.logger.log(`ModularShipFactory.create(): type: ${ShipClass[type]}`);

    switch (type) {
      case ShipClass.Carrier: {
        return new ModularCarrier();
      }
      case ShipClass.Battleship: {
        return new ModularBattleship();
      }
      case ShipClass.Cruiser: {
        return new ModularCruiser();
      }
      case ShipClass.Submarine: {
        return new ModularSubmarine();
      }
      case ShipClass.Speedboat: {
        return new ModularSpeedboat();
      }
    }
  }
}
