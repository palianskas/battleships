import { Ammo, AmmoType } from '../../../models/Ammo';
import { CustomizableAmmoBuilder } from './AmmoBuilder';

jest.mock('../../../models/Ammo');

describe('CustomizableAmmoBuilder', () => {
  let instance;

  beforeEach(() => {
    instance = new CustomizableAmmoBuilder();
  });

  it('instance should be an instanceof CustomizableAmmoBuilder', () => {
    expect(instance instanceof CustomizableAmmoBuilder).toBeTruthy();
  });

  it('should have a method build()', () => {
    // instance.build();
    expect(false).toBeTruthy();
  });

  it('should have a method setName()', () => {
    // instance.setName(name);
    expect(false).toBeTruthy();
  });

  it('should have a method setType()', () => {
    // instance.setType(type);
    expect(false).toBeTruthy();
  });

  it('should have a method setDamage()', () => {
    // instance.setDamage(damage);
    expect(false).toBeTruthy();
  });

  it('should have a method setImpactRadius()', () => {
    // instance.setImpactRadius(impactRadius);
    expect(false).toBeTruthy();
  });

  it('should have a method setCooldown()', () => {
    // instance.setCooldown(cooldown);
    expect(false).toBeTruthy();
  });
});