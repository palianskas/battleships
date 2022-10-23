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

jest.mock('../../../models/Ships/ObservingShips');
jest.mock('../../../models/Ships/ShipClass');
jest.mock('./ShipFactory');

describe('ObservingShipFactory', () => {
  let instance;

  beforeEach(() => {
    instance = new ObservingShipFactory();
  });

  it('instance should be an instanceof ObservingShipFactory', () => {
    expect(instance instanceof ObservingShipFactory).toBeTruthy();
  });

  it('should have a method create()', () => {
    // instance.create(type);
    expect(false).toBeTruthy();
  });
});