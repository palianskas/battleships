import { Ammo, AmmoType } from '../../../models/Ammo';
import {
  CustomizableAmmoBuilder,
  ClassicAmmoBuilder,
  IAmmoBuilder,
} from './AmmoBuilder';

export interface IAmmoConstructor {
  getClassicAmmo(): Ammo;
  getStandardAmmo(): Ammo;
  getArmorPiercingAmmo(): Ammo;
  getHighExplosiveAmmo(): Ammo;
  getDepthChargeAmmo(): Ammo;
}

export class AmmoConstructor implements IAmmoConstructor {
  getClassicAmmo(): Ammo {
    const builder: IAmmoBuilder = new ClassicAmmoBuilder();

    return builder.setName('Classic').build();
  }

  getStandardAmmo(): Ammo {
    const builder: IAmmoBuilder = new CustomizableAmmoBuilder();

    return builder
      .setName('Standard')
      .setType(AmmoType.Standard)
      .setDamage(3)
      .setImpactRadius(1)
      .setCooldown(0)
      .build();
  }

  getArmorPiercingAmmo(): Ammo {
    const builder: IAmmoBuilder = new CustomizableAmmoBuilder();

    return builder
      .setName('Armor Piercing')
      .setType(AmmoType.ArmorPiercing)
      .setDamage(10)
      .setImpactRadius(1)
      .setCooldown(1)
      .build();
  }
  getHighExplosiveAmmo(): Ammo {
    const builder: IAmmoBuilder = new CustomizableAmmoBuilder();

    return builder
      .setName('High Explosive')
      .setType(AmmoType.HighExplosive)
      .setDamage(2)
      .setImpactRadius(2)
      .setCooldown(0)
      .build();
  }
  getDepthChargeAmmo(): Ammo {
    const builder: IAmmoBuilder = new CustomizableAmmoBuilder();

    return builder
      .setName('Depth Charge')
      .setType(AmmoType.DepthCharge)
      .setDamage(5)
      .setImpactRadius(2)
      .setCooldown(0)
      .build();
  }
}
