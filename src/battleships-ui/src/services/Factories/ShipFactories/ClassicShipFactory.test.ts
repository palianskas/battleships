import {
  ClassicBattleship,
  ClassicCarrier,
  ClassicCruiser,
  ClassicSpeedboat,
  ClassicSubmarine,
  IClassicShip,
} from '../../../models/Ships/ClassicShips';
import { ShipClass } from '../../../models/Ships/ShipClass';
import ClassicShipFactory from './ClassicShipFactory';

const factory = ClassicShipFactory.Instance;
test('should return instance', () => {
    expect(factory instanceof ClassicShipFactory).toBeTruthy();
});

describe('should have a method create()', () => {
      test('should create a ClassicCarrier when type is ShipClass.carrier', () => {
          const ship = factory.create(ShipClass.Carrier);

          expect(ship instanceof ClassicCarrier).toBeTruthy();
          expect(ship instanceof ClassicBattleship).toBeFalsy();
          expect(ship instanceof ClassicCruiser).toBeFalsy();
          expect(ship instanceof ClassicSubmarine).toBeFalsy();
          expect(ship instanceof ClassicSpeedboat).toBeFalsy();
      });

      test('should create a ClassicBattleships when type is ShipClass.battleShip', () => {
          const ship = factory.create(ShipClass.Battleship);

          expect(ship instanceof ClassicCarrier).toBeFalsy();
          expect(ship instanceof ClassicBattleship).toBeTruthy();
          expect(ship instanceof ClassicCruiser).toBeFalsy();
          expect(ship instanceof ClassicSubmarine).toBeFalsy();
          expect(ship instanceof ClassicSpeedboat).toBeFalsy();
      });

      test('should create a ClassicCruiser when type is ShipClass.cruiser', () => {
          const ship = factory.create(ShipClass.Cruiser);

          expect(ship instanceof ClassicCarrier).toBeFalsy();
          expect(ship instanceof ClassicBattleship).toBeFalsy();
          expect(ship instanceof ClassicCruiser).toBeTruthy();
          expect(ship instanceof ClassicSubmarine).toBeFalsy();
          expect(ship instanceof ClassicSpeedboat).toBeFalsy();
      });

      test('should create a ClassicSubmarine when type is ShipClass.submarine', () => {
          const ship = factory.create(ShipClass.Submarine);

          expect(ship instanceof ClassicCarrier).toBeFalsy();
          expect(ship instanceof ClassicBattleship).toBeFalsy();
          expect(ship instanceof ClassicCruiser).toBeFalsy();
          expect(ship instanceof ClassicSubmarine).toBeTruthy();
          expect(ship instanceof ClassicSpeedboat).toBeFalsy();
      });

      test('should create a ClassicSpeedboat when type is ShipClass.speedboat', () => {
          const ship = factory.create(ShipClass.Speedboat);

          expect(ship instanceof ClassicCarrier).toBeFalsy();
          expect(ship instanceof ClassicBattleship).toBeFalsy();
          expect(ship instanceof ClassicCruiser).toBeFalsy();
          expect(ship instanceof ClassicSubmarine).toBeFalsy();
          expect(ship instanceof ClassicSpeedboat).toBeTruthy();
      });
});