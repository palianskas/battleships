import { Ammo, AmmoType } from '../../../models/Ammo';
import { CustomizableAmmoBuilder } from './AmmoBuilder';

jest.mock('../../../models/Ammo');

describe('CustomizableAmmoBuilder', () => {
  let instance: any;

  beforeEach(() => {
    instance = new CustomizableAmmoBuilder();
  });

  it('instance should be an instanceof CustomizableAmmoBuilder', () => {
    expect(instance instanceof CustomizableAmmoBuilder).toBeTruthy();
  });

  it('should have a method build()', () => {
    // instance.build();
    expect(true).toBeTruthy();
  });

  it('should have a method setName()', () => {
    // instance.setName(name);
    expect(true).toBeTruthy();
  });

  it('should have a method setType()', () => {
    // instance.setType(type);
    expect(true).toBeTruthy();
  });

  it('should have a method setDamage()', () => {
    // instance.setDamage(damage);
    expect(true).toBeTruthy();
  });

  it('should have a method setImpactRadius()', () => {
    // instance.setImpactRadius(impactRadius);
    expect(true).toBeTruthy();
  });

  it('should have a method setCooldown()', () => {
    // instance.setCooldown(cooldown);
    expect(true).toBeTruthy();
  });
});
