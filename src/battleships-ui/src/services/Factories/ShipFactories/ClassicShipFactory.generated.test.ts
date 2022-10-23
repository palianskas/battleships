import {
  ClassicBattleship,
  ClassicCarrier,
  ClassicCruiser,
  ClassicSpeedboat,
  ClassicSubmarine,
  IClassicShip,
} from '../../../models/Ships/ClassicShips';
import { ShipClass } from '../../../models/Ships/ShipClass';
import { IShipFactory } from './ShipFactory';
import ClassicShipFactory from './ClassicShipFactory';

jest.mock('../../../models/Ships/ClassicShips');
jest.mock('../../../models/Ships/ShipClass');
jest.mock('./ShipFactory');

describe('ClassicShipFactory', () => {
  let instance;

  beforeEach(() => {
    instance = new ClassicShipFactory();
  });

  it('instance should be an instanceof ClassicShipFactory', () => {
    expect(instance instanceof ClassicShipFactory).toBeTruthy();
  });

  it('should have a method create()', () => {
    // instance.create(type);
    expect(false).toBeTruthy();
  });
});