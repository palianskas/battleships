import { ShipClass } from '../../../../models/Ships/ShipClass';
import { ModularShipPart, ShipPart } from '../../../../models/Ships/ShipPart';
import ShipPartFactory from './ShipPartFactory';

jest.mock('../../../../models/Ships/ShipClass');
jest.mock('../../../../models/Ships/ShipPart');

describe('ShipPartFactory', () => {
  let instance;

  beforeEach(() => {
    instance = new ShipPartFactory();
  });

  it('instance should be an instanceof ShipPartFactory', () => {
    expect(instance instanceof ShipPartFactory).toBeTruthy();
  });

  it('should have a method createParts()', () => {
    // instance.createParts(amount,isModular,shipClass);
    expect(false).toBeTruthy();
  });

  it('should have a method createPart()', () => {
    // instance.createPart(isModular,shipClass);
    expect(false).toBeTruthy();
  });
});