import { ShipClass } from '../../../../models/Ships/ShipClass';
import { ModularShipPart, ShipPart } from '../../../../models/Ships/ShipPart';
import ShipPartFactory, { ShipPartType } from './ShipPartFactory';

const factory = new ShipPartFactory();

describe('createParts(amount, isModular)', () => {
  test.each([{ n: 0 }, { n: 1 }, { n: 2 }, { n: 3 }, { n: 4 }, { n: 5 }])(
    'Should return array of size $n when amount is $n',
    ({ n }) => {
      const parts = factory.createParts(
        n,
        ShipPartType.Classic,
        ShipClass.Battleship
      );

      expect(parts.length).toEqual(n);
    }
  );

  test('Should return empty array when amount is negative', () => {
    const parts = factory.createParts(
      -1,
      ShipPartType.Classic,
      ShipClass.Battleship
    );

    expect(parts).toEqual([]);
  });

  test('Should return array of ModularShipPart when isModular is true', () => {
    const parts = factory.createParts(
      1,
      ShipPartType.Modular,
      ShipClass.Battleship
    );

    expect(parts[0] instanceof ModularShipPart).toBeTruthy();
  });

  test('Should return array of ShipPart when isModular is false', () => {
    const parts = factory.createParts(
      1,
      ShipPartType.Classic,
      ShipClass.Battleship
    );

    expect(parts[0] instanceof ShipPart).toBeTruthy();
    expect(parts[0] instanceof ModularShipPart).toBeFalsy();
  });
});
