import { AirshipClass, Drone, Plane } from '../../../models/Airships/Airship';
import AirshipFactory from './AirshipFactory';
import ObservingShipFactory from '../ShipFactories/ObservingShipFactory';
import { ShipClass } from '../../../models/Ships/ShipClass';

const factory = new AirshipFactory();

describe('create(type)', () => {
  test('Should create a Plane when type is AirshipClass.Plane', () => {
    const carrierShip = ObservingShipFactory.Instance.create(ShipClass.Carrier);
    const airship = factory.create(carrierShip, AirshipClass.Plane);

    expect(airship instanceof Plane).toBeTruthy();
    expect(airship instanceof Drone).toBeFalsy();
  });

  test('Should create a Drone when type is AirshipClass.Drone', () => {
    const carrierShip = ObservingShipFactory.Instance.create(ShipClass.Carrier);
    const airship = factory.create(carrierShip, AirshipClass.Drone);

    expect(airship instanceof Drone).toBeTruthy();
    expect(airship instanceof Plane).toBeFalsy();
  });
});
