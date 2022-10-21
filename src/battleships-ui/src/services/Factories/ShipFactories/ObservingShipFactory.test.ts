import {
  ObservingBattleship,
  ObservingCarrier,
  ObservingCruiser,
  ObservingSpeedboat,
  ObservingSubmarine,
  IObservingShip,
} from '../../../models/Ships/ObservingShips';
import { ShipClass } from '../../../models/Ships/ShipClass';
import { IShipFactory } from './ShipFactory';
import ObservingShipFactory from './ObservingShipFactory';

const factory = ObservingShipFactory.Instance;
test('should return instance', () => {
    expect(factory instanceof ObservingShipFactory).toBeTruthy();
});

describe('create(type)', () => {
    test('should create a ObservingCarrier when type is ShipClass.Carrier', () => {
        const ship = factory.create(ShipClass.Carrier);

        expect(ship instanceof ObservingCarrier).toBeTruthy();
        expect(ship instanceof ObservingBattleship).toBeFalsy();
        expect(ship instanceof ObservingCruiser).toBeFalsy();
        expect(ship instanceof ObservingSubmarine).toBeFalsy();
        expect(ship instanceof ObservingSpeedboat).toBeFalsy();
    });

    test('should create a ObservingBattleship when type is ShipClass.Battleshiip', () => {
        const ship = factory.create(ShipClass.Battleship);

        expect(ship instanceof ObservingCarrier).toBeFalsy();
        expect(ship instanceof ObservingBattleship).toBeTruthy();
        expect(ship instanceof ObservingCruiser).toBeFalsy();
        expect(ship instanceof ObservingSubmarine).toBeFalsy();
        expect(ship instanceof ObservingSpeedboat).toBeFalsy();
    });

    test('should create a ObservingCruiser when type is ShipClass.Cruiser', () => {
        const ship = factory.create(ShipClass.Cruiser);

        expect(ship instanceof ObservingCarrier).toBeFalsy();
        expect(ship instanceof ObservingBattleship).toBeFalsy();
        expect(ship instanceof ObservingCruiser).toBeTruthy();
        expect(ship instanceof ObservingSubmarine).toBeFalsy();
        expect(ship instanceof ObservingSpeedboat).toBeFalsy();
    });

    test('should create a ObservingSubmarine when type is ShipClass.Submarine', () => {
        const ship = factory.create(ShipClass.Submarine);

        expect(ship instanceof ObservingCarrier).toBeFalsy();
        expect(ship instanceof ObservingBattleship).toBeFalsy();
        expect(ship instanceof ObservingCruiser).toBeFalsy();
        expect(ship instanceof ObservingSubmarine).toBeTruthy();
        expect(ship instanceof ObservingSpeedboat).toBeFalsy();
    });

    test('should create a ObservingSpeedboat when type is ShipClass.Speedboat', () => {
        const ship = factory.create(ShipClass.Speedboat);

        expect(ship instanceof ObservingCarrier).toBeFalsy();
        expect(ship instanceof ObservingBattleship).toBeFalsy();
        expect(ship instanceof ObservingCruiser).toBeFalsy();
        expect(ship instanceof ObservingSubmarine).toBeFalsy();
        expect(ship instanceof ObservingSpeedboat).toBeTruthy();
    });

});