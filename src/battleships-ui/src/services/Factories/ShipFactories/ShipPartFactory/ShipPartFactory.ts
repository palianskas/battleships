import { ShipClass } from '../../../../models/Ships/ShipClass';
import { ModularShipPart, ShipPart } from '../../../../models/Ships/ShipPart';

export interface IShipPartFactory {
  createParts(
    amount: number,
    isModular: boolean,
    shipClass: ShipClass
  ): ShipPart[];
}

export default class ShipPartFactory implements IShipPartFactory {
  createParts(
    amount: number,
    isModular: boolean,
    shipClass: ShipClass
  ): ShipPart[] {
    const result: ShipPart[] = [];

    for (let i = 0; i < amount; i++) {
      result.push(this.createPart(isModular, shipClass));
    }

    return result;
  }

  private createPart(isModular: boolean, shipClass: ShipClass) {
    if (isModular) {
      return new ModularShipPart(shipClass);
    }

    return new ShipPart(shipClass);
  }
}
