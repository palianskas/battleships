import {
    ModularBattleship,
    ModularCarrier,
    ModularCruiser,
    ModularSpeedboat,
    ModularSubmarine,
    IModularShip,
} from '../../../models/Ships/ModularShips';
import { ShipClass } from '../../../models/Ships/ShipClass';
import { IShipFactory } from './ShipFactory';
import ModularShipFactory from './ModularShipFactory';

const factory = ModularShipFactory.Instance;
test('should return instance', () => {
    expect(factory instanceof ModularShipFactory).toBeTruthy();
});

describe('create(type)', () => {
    test('should create a ModularCarrier when type is ShipClass.Carrier', () => {
        const ship = factory.create(ShipClass.Carrier);

        expect(ship instanceof ModularCarrier).toBeTruthy();
        expect(ship instanceof ModularBattleship).toBeFalsy();
        expect(ship instanceof ModularCruiser).toBeFalsy();
        expect(ship instanceof ModularSubmarine).toBeFalsy();
        expect(ship instanceof ModularSpeedboat).toBeFalsy();
    });

    test('should create a ModularBattleship when type is ShipClass.Battleshiip', () => {
        const ship = factory.create(ShipClass.Battleship);

        expect(ship instanceof ModularCarrier).toBeFalsy();
        expect(ship instanceof ModularBattleship).toBeTruthy();
        expect(ship instanceof ModularCruiser).toBeFalsy();
        expect(ship instanceof ModularSubmarine).toBeFalsy();
        expect(ship instanceof ModularSpeedboat).toBeFalsy();
    });

    test('should create a ModularCruiser when type is ShipClass.Cruiser', () => {
        const ship = factory.create(ShipClass.Cruiser);

        expect(ship instanceof ModularCarrier).toBeFalsy();
        expect(ship instanceof ModularBattleship).toBeFalsy();
        expect(ship instanceof ModularCruiser).toBeTruthy();
        expect(ship instanceof ModularSubmarine).toBeFalsy();
        expect(ship instanceof ModularSpeedboat).toBeFalsy();
    });

    test('should create a ModularSubmarine when type is ShipClass.Submarine', () => {
        const ship = factory.create(ShipClass.Submarine);

        expect(ship instanceof ModularCarrier).toBeFalsy();
        expect(ship instanceof ModularBattleship).toBeFalsy();
        expect(ship instanceof ModularCruiser).toBeFalsy();
        expect(ship instanceof ModularSubmarine).toBeTruthy();
        expect(ship instanceof ModularSpeedboat).toBeFalsy();
    });

    test('should create a ModularSpeedboat when type is ShipClass.Speedboat', () => {
        const ship = factory.create(ShipClass.Speedboat);

        expect(ship instanceof ModularCarrier).toBeFalsy();
        expect(ship instanceof ModularBattleship).toBeFalsy();
        expect(ship instanceof ModularCruiser).toBeFalsy();
        expect(ship instanceof ModularSubmarine).toBeFalsy();
        expect(ship instanceof ModularSpeedboat).toBeTruthy();
    });

});
