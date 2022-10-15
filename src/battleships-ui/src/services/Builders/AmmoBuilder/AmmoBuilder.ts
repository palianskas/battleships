import { Ammo, AmmoType } from '../../../models/Ammo';

export interface IAmmoBuilder {
  build(): Ammo;
  setName(name: string): IAmmoBuilder;
  setType(type: AmmoType): IAmmoBuilder;
  setDamage(damage: number): IAmmoBuilder;
  setImpactRadius(impactRadius: number): IAmmoBuilder;
  setCooldown(cooldown: number): IAmmoBuilder;
}

export class ClassicAmmoBuilder implements IAmmoBuilder {
  private ammo = new Ammo();

  constructor() {
    this.ammo.cooldown = 0;
    this.ammo.damage = 1;
    this.ammo.impactRadius = 1;
    this.ammo.type = AmmoType.Classic;
  }

  build(): Ammo {
    return this.ammo;
  }
  setName(name: string): IAmmoBuilder {
    this.ammo.name = name;

    return this;
  }

  setType(): IAmmoBuilder {
    return this;
  }
  setDamage(): IAmmoBuilder {
    return this;
  }
  setImpactRadius(): IAmmoBuilder {
    return this;
  }
  setCooldown(): IAmmoBuilder {
    return this;
  }
}

export class CustomizableAmmoBuilder implements IAmmoBuilder {
  private ammo = new Ammo();

  build(): Ammo {
    return this.ammo;
  }
  setName(name: string): IAmmoBuilder {
    this.ammo.name = name;

    return this;
  }
  setType(type: AmmoType): IAmmoBuilder {
    this.ammo.type = type;

    return this;
  }
  setDamage(damage: number): IAmmoBuilder {
    this.ammo.damage = damage;

    return this;
  }
  setImpactRadius(impactRadius: number): IAmmoBuilder {
    this.ammo.impactRadius = impactRadius;

    return this;
  }
  setCooldown(cooldown: number): IAmmoBuilder {
    this.ammo.cooldown = cooldown;

    return this;
  }
}
