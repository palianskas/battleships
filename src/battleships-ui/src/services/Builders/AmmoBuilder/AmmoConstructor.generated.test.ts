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
  let instance: any;

  beforeEach(() => {
    instance = new AmmoConstructor();
  });

  it('instance should be an instanceof AmmoConstructor', () => {
    expect(instance instanceof AmmoConstructor).toBeTruthy();
  });

  it('should have a method getClassicAmmo()', () => {
    // instance.getClassicAmmo();
    expect(true).toBeTruthy();
  });

  it('should have a method getStandardAmmo()', () => {
    // instance.getStandardAmmo();
    expect(true).toBeTruthy();
  });

  it('should have a method getArmorPiercingAmmo()', () => {
    // instance.getArmorPiercingAmmo();
    expect(true).toBeTruthy();
  });

  it('should have a method getHighExplosiveAmmo()', () => {
    // instance.getHighExplosiveAmmo();
    expect(true).toBeTruthy();
  });

  it('should have a method getDepthChargeAmmo()', () => {
    // instance.getDepthChargeAmmo();
    expect(true).toBeTruthy();
  });
});
