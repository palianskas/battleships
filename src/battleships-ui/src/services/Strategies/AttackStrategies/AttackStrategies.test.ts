import MatchMap from '../../../models/MatchMap';
import { ShipClass } from '../../../models/Ships/ShipClass';
import { ModularShipPart, ShipPart } from '../../../models/Ships/ShipPart';
import {
  AreaAttackStrategy,
  DamageAttackStrategy,
  DefaultAttackStrategy,
  ShipSpecificAttackStrategy,
} from './AttackStrategies';

let map: MatchMap;

beforeEach(() => {
  map = new MatchMap();
  jest.clearAllMocks();
});

describe('DefaultAttackStrategy', () => {
  describe('attack(tile, map)', () => {
    test.each([
      { x: 0, y: 0 },
      { x: 2, y: 3 },
      { x: 7, y: 5 },
      { x: 8, y: 1 },
      { x: 9, y: 9 },
    ])('Should mark specified tile ($x:$y) as attacked', ({ x, y }) => {
      const tile = map.tiles[x][y];

      const strategy = new DefaultAttackStrategy();

      strategy.attack(tile, map);

      expect(tile.isAttacked).toBeTruthy();
    });
  });
});

describe('DamageAttackStrategy', () => {
  describe('attack(tile, map)', () => {
    test.each([
      { damage: 0 },
      { damage: 1 },
      { damage: 2 },
      { damage: 5 },
      { damage: 7 },
      { damage: 9 },
    ])(
      'Should damage ship part by $damage if damage is $damage',
      ({ damage }) => {
        const tile = map.tiles[0][0];
        const shipPart = new ModularShipPart(ShipClass.Battleship);
        tile.shipPart = shipPart;
        const initialShipPartHp = shipPart.hp;

        const strategy = new DamageAttackStrategy(
          new DefaultAttackStrategy(),
          damage
        );

        strategy.attack(tile, map);

        expect(shipPart.hp).toEqual(initialShipPartHp - damage);
      }
    );

    test('Should mark ship part as destroyed if hp falls below 1', () => {
      const tile = map.tiles[0][0];
      const shipPart = new ModularShipPart(ShipClass.Battleship);
      tile.shipPart = shipPart;

      const strategy = new DamageAttackStrategy(
        new DefaultAttackStrategy(),
        10
      );

      strategy.attack(tile, map);

      expect(shipPart.hp).toEqual(0);
      expect(shipPart.isDestroyed).toBeTruthy();
      expect(tile.isShipPartDestroyed).toBeTruthy();
    });

    test.each([{ hp: 0 }, { hp: 1 }, { hp: 5 }, { hp: 8 }, { hp: 10 }])(
      'Should not reduce ship part hp below 0 when hp was $hp and damage is 10',
      ({ hp }) => {
        const tile = map.tiles[0][0];
        const shipPart = new ModularShipPart(ShipClass.Battleship);
        shipPart.hp = hp;
        tile.shipPart = shipPart;

        const strategy = new DamageAttackStrategy(
          new DefaultAttackStrategy(),
          10
        );

        strategy.attack(tile, map);

        expect(shipPart.hp).toEqual(0);
      }
    );

    test('Should call base attack strategy once on `attack` call', () => {
      const defaultStrategy = new DefaultAttackStrategy();

      jest.spyOn(defaultStrategy, 'attack');

      const tile = map.tiles[4][4];

      const strategy = new DamageAttackStrategy(defaultStrategy, 1);

      strategy.attack(tile, map);

      expect(defaultStrategy.attack).toBeCalledTimes(1);
    });
  });
});

describe('AreaAttackStrategy', () => {
  describe('attack(tile, map)', () => {
    test.each([{ radius: 0 }, { radius: 1 }, { radius: 2 }, { radius: 10 }])(
      'Should attack all tiles in area when radius is $radius',
      ({ radius }) => {
        const tile = map.tiles[2][2];

        const strategy = new AreaAttackStrategy(
          new DamageAttackStrategy(new DefaultAttackStrategy(), 1),
          radius
        );

        strategy.attack(tile, map);

        for (let i = tile.x - (radius - 1); i < tile.x + radius; i++) {
          for (let j = tile.y - (radius - 1); j < tile.y + radius; j++) {
            if (
              i < 0 ||
              i >= map.tiles.length ||
              j < 0 ||
              j >= map.tiles.length
            ) {
              continue;
            }

            const tile = map.tiles[i][j];

            expect(tile.isAttacked).toBeTruthy();
          }
        }
      }
    );

    test.each([{ radius: 0 }, { radius: 1 }, { radius: 2 }, { radius: 10 }])(
      'Should not attack tiles outside of area when radius is $radius',
      ({ radius }) => {
        const tile = map.tiles[2][2];

        const strategy = new AreaAttackStrategy(
          new DamageAttackStrategy(new DefaultAttackStrategy(), 1),
          radius
        );

        strategy.attack(tile, map);

        for (let i = 0; i < map.tiles.length; i++) {
          if (i >= tile.x - (radius - 1) || i < tile.x + radius) {
            continue;
          }

          for (let j = 0; j < map.tiles.length; j++) {
            if (j >= tile.y - (radius - 1) || j < tile.y + radius) {
              continue;
            }

            expect(tile.isAttacked).toBeFalsy();
          }
        }
      }
    );

    test.each([{ radius: 1 }, { radius: 2 }, { radius: 3 }])(
      'Should call base attack strategy once for every tile in area when radius is $radius',
      ({ radius }) => {
        const damageStrategy = new DamageAttackStrategy(
          new DefaultAttackStrategy(),
          1
        );

        jest.spyOn(damageStrategy, 'attack');

        const tile = map.tiles[4][4];

        const strategy = new AreaAttackStrategy(damageStrategy, radius);

        strategy.attack(tile, map);

        expect(damageStrategy.attack).toBeCalledTimes(
          Math.pow(radius * 2 - 1, 2)
        );
      }
    );
  });
});

describe('ShipSpecificAttackStrategy', () => {
  describe('attack(tile, map)', () => {
    test('Should call all attack strategies in stack', () => {
      const defaultStrategy = new DefaultAttackStrategy();
      const damageStrategy = new DamageAttackStrategy(defaultStrategy, 0);
      const shipSpecificStrategy = new ShipSpecificAttackStrategy(
        damageStrategy,
        [ShipClass.Battleship]
      );

      const tile = map.tiles[0][0];

      tile.shipPart = new ShipPart(ShipClass.Battleship);

      jest.spyOn(defaultStrategy, 'attack');
      jest.spyOn(damageStrategy, 'attack');
      jest.spyOn(shipSpecificStrategy, 'attack');

      shipSpecificStrategy.attack(tile, map);

      expect(defaultStrategy.attack).toBeCalledTimes(1);
      expect(damageStrategy.attack).toBeCalledTimes(1);
      expect(shipSpecificStrategy.attack).toBeCalledTimes(1);
    });
  });
});
