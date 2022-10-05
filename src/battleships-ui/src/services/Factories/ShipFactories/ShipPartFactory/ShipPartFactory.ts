import { ModularShipPart, ShipPart } from '../../../../models/Ships/ShipPart';

export interface IShipPartFactory {
  createParts(amount: number, isModular: boolean): ShipPart[];
}

export default class ShipPartFactory implements IShipPartFactory {
  createParts(amount: number, isModular: boolean): ShipPart[] {
    const result: ShipPart[] = [];

    for (let i = 0; i < amount; i++) {
      result.push(this.createPart(isModular));
    }

    return result;
  }

  private createPart(isModular: boolean) {
    if (isModular) {
      return new ModularShipPart();
    }

    return new ShipPart();
  }
}
