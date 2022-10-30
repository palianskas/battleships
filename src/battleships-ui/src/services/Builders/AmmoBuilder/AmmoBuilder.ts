import { Ammo, AmmoType } from '../../../models/Ammo';
import LoggerService, { PatternTypes } from '../../LoggerService/LoggerService';

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

  private logger = LoggerService.Instance.getLogger(PatternTypes.Builder);

  constructor() {
    this.ammo.cooldown = 0;
    this.ammo.damage = 1;
    this.ammo.impactRadius = 1;
    this.ammo.type = AmmoType.Classic;
  }

  build(): Ammo {
    this.logger.log(`ClassicAmmoBuilder.build()`);

    return this.ammo;
  }
  setName(name: string): IAmmoBuilder {
    this.logger.log(`ClassicAmmoBuilder.setName()`);
    this.ammo.name = name;

    return this;
  }

  setType(): IAmmoBuilder {
    this.logger.log(`ClassicAmmoBuilder.setType()`);
    return this;
  }
  setDamage(): IAmmoBuilder {
    this.logger.log(`ClassicAmmoBuilder.setDamage()`);
    return this;
  }
  setImpactRadius(): IAmmoBuilder {
    this.logger.log(`ClassicAmmoBuilder.setImpactRadius()`);
    return this;
  }
  setCooldown(): IAmmoBuilder {
    this.logger.log(`ClassicAmmoBuilder.setCooldown()`);
    return this;
  }
}

export class CustomizableAmmoBuilder implements IAmmoBuilder {
  private ammo = new Ammo();

  private logger = LoggerService.Instance.getLogger(PatternTypes.Builder);

  build(): Ammo {
    this.logger.log(`CustomizableAmmoBuilder.build()`);
    return this.ammo;
  }
  setName(name: string): IAmmoBuilder {
    this.logger.log(`CustomizableAmmoBuilder.setName(), name: ${name}`);
    this.ammo.name = name;

    return this;
  }
  setType(type: AmmoType): IAmmoBuilder {
    this.logger.log(
      `CustomizableAmmoBuilder.setType(), type: ${AmmoType[type]}`
    );
    this.ammo.type = type;

    return this;
  }
  setDamage(damage: number): IAmmoBuilder {
    this.logger.log(`CustomizableAmmoBuilder.setDamage(), damage: ${damage}`);
    this.ammo.damage = damage;

    return this;
  }
  setImpactRadius(impactRadius: number): IAmmoBuilder {
    this.logger.log(
      `CustomizableAmmoBuilder.setImpactRadius(), impactRadius: ${impactRadius}`
    );
    this.ammo.impactRadius = impactRadius;

    return this;
  }
  setCooldown(cooldown: number): IAmmoBuilder {
    this.logger.log(
      `CustomizableAmmoBuilder.setCooldown(), cooldown: ${cooldown}`
    );
    this.ammo.cooldown = cooldown;

    return this;
  }
}
