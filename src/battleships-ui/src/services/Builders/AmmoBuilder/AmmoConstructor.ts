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

    const damage = 3;
    const impactRadius = 1;
    const cooldown = 0;

    return builder
      .setName('Standard')
      .setType(AmmoType.Standard)
      .setDamage(damage)
      .setImpactRadius(impactRadius)
      .setCooldown(cooldown)
      .build();
  }

  getArmorPiercingAmmo(): Ammo {
    const builder: IAmmoBuilder = new CustomizableAmmoBuilder();

    const damage = 10;
    const impactRadius = 1;
    const cooldown = 1;

    return builder
      .setName('Armor Piercing')
      .setType(AmmoType.ArmorPiercing)
      .setDamage(damage)
      .setImpactRadius(impactRadius)
      .setCooldown(cooldown)
      .build();
  }
  getHighExplosiveAmmo(): Ammo {
    const builder: IAmmoBuilder = new CustomizableAmmoBuilder();

    const damage = 2;
    const impactRadius = 2;
    const cooldown = 0;

    return builder
      .setName('High Explosive')
      .setType(AmmoType.HighExplosive)
      .setDamage(damage)
      .setImpactRadius(impactRadius)
      .setCooldown(cooldown)
      .build();
  }
  getDepthChargeAmmo(): Ammo {
    const builder: IAmmoBuilder = new CustomizableAmmoBuilder();

    const damage = 4;
    const impactRadius = 2;
    const cooldown = 0;

    return builder
      .setName('Depth Charge')
      .setType(AmmoType.DepthCharge)
      .setDamage(damage)
      .setImpactRadius(impactRadius)
      .setCooldown(cooldown)
      .build();
  }
}
