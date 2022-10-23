import { Ammo, AmmoType } from '../../../models/Ammo';
import {
  CustomizableAmmoBuilder,
  ClassicAmmoBuilder,
  IAmmoBuilder,
} from './AmmoBuilder';
import { AmmoConstructor } from './AmmoConstructor';

jest.mock('../../../models/Ammo');
jest.mock('./AmmoBuilder');

describe('AmmoConstructor', () => {
  let instance;

  beforeEach(() => {
    instance = new AmmoConstructor();
  });

  it('instance should be an instanceof AmmoConstructor', () => {
    expect(instance instanceof AmmoConstructor).toBeTruthy();
  });

  it('should have a method getClassicAmmo()', () => {
    // instance.getClassicAmmo();
    expect(false).toBeTruthy();
  });

  it('should have a method getStandardAmmo()', () => {
    // instance.getStandardAmmo();
    expect(false).toBeTruthy();
  });

  it('should have a method getArmorPiercingAmmo()', () => {
    // instance.getArmorPiercingAmmo();
    expect(false).toBeTruthy();
  });

  it('should have a method getHighExplosiveAmmo()', () => {
    // instance.getHighExplosiveAmmo();
    expect(false).toBeTruthy();
  });

  it('should have a method getDepthChargeAmmo()', () => {
    // instance.getDepthChargeAmmo();
    expect(false).toBeTruthy();
  });
});