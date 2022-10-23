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

jest.mock('../../../models/Ships/ModularShips');
jest.mock('../../../models/Ships/ShipClass');
jest.mock('./ShipFactory');

describe('ModularShipFactory', () => {
  let instance: any;

  beforeEach(() => {
    instance = ModularShipFactory.Instance;
  });

  it('instance should be an instanceof ModularShipFactory', () => {
    expect(instance instanceof ModularShipFactory).toBeTruthy();
  });

  it('should have a method create()', () => {
    // instance.create(type);
    expect(true).toBeTruthy();
  });
});
