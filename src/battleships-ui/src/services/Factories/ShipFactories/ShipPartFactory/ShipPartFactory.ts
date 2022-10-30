import { ShipClass } from '../../../../models/Ships/ShipClass';
import {
  ClassicShipPart,
  ModularShipPart,
  ObservingShipPart,
  ShipPart,
} from '../../../../models/Ships/ShipPart';
import LoggerService, {
  PatternTypes,
} from '../../../LoggerService/LoggerService';

export enum ShipPartType {
  Classic,
  Modular,
  Observing,
}

export interface IShipPartFactory {
  createParts(
    amount: number,
    type: ShipPartType,
    shipClass: ShipClass
  ): ShipPart[];
}

export default class ShipPartFactory implements IShipPartFactory {
  logger = LoggerService.Instance.getLogger(PatternTypes.Factory);

  createParts(
    amount: number,
    type: ShipPartType,
    shipClass: ShipClass
  ): ShipPart[] {
    const result: ShipPart[] = [];

    this.logger.log(
      `ShipPartFactory.createParts(): creating ${amount} of ${ShipPartType[type]} ${ShipClass[shipClass]} parts`
    );
    for (let i = 0; i < amount; i++) {
      result.push(this.createPart(type, shipClass));
    }

    return result;
  }

  private createPart(type: ShipPartType, shipClass: ShipClass) {
    switch (type) {
      case ShipPartType.Classic: {
        return new ClassicShipPart(shipClass);
      }
      case ShipPartType.Modular: {
        return new ModularShipPart(shipClass);
      }
      case ShipPartType.Observing: {
        return new ObservingShipPart(shipClass);
      }
    }
  }
}
