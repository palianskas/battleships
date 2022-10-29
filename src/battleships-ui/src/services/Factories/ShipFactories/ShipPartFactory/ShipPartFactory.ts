import { ShipClass } from '../../../../models/Ships/ShipClass';
import {
  ClassicShipPart,
  ModularShipPart,
  ObservingShipPart,
  ShipPart,
} from '../../../../models/Ships/ShipPart';

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
  createParts(
    amount: number,
    type: ShipPartType,
    shipClass: ShipClass
  ): ShipPart[] {
    const result: ShipPart[] = [];

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
