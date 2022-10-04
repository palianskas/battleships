import { ModularShipPart, ShipPart } from '../../../../models/Ships/ShipPart';

export default class ShipPartFactory {
  static createParts(amount: number, isModular: boolean): ShipPart[] {
    const result: ShipPart[] = [];

    for (let i = 0; i < amount; i++) {
      result.push(this.createPart(isModular));
    }

    return result;
  }

  private static createPart(isModular: boolean) {
    if (isModular) {
      return new ModularShipPart();
    }

    return new ShipPart();
  }
}
