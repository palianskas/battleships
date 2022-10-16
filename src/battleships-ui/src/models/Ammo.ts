import { IAttackStrategy } from '../services/Strategies/AttackStrategies/AttackStrategies';
import { StandardAttackStrategy } from '../services/Strategies/AttackStrategies/StandardAttackStrategy';

// non-Classic ammo types used only in "Ammo" gamemode
export enum AmmoType {
  Classic,
  Standard,
  ArmorPiercing,
  HighExplosive,
  DepthCharge,
}

export class Ammo {
  name!: string;
  type!: AmmoType;
  damage!: number;
  impactRadius!: number;
  cooldown?: number;
  attackStrategy!: IAttackStrategy;

  getAttackStrategy(): IAttackStrategy {
    return this.attackStrategy;
  }

  static map(object: Partial<Ammo>, model = new Ammo()): Ammo {
    if (object == null) {
      return model;
    }

    model.name = object.name ?? 'Standard';
    model.type = object.type ?? AmmoType.Standard;
    model.damage = object.damage ?? 1;
    model.impactRadius = object.impactRadius ?? 1;
    model.cooldown = object.cooldown ?? 0;
    model.attackStrategy =
      object.attackStrategy ?? new StandardAttackStrategy(model.damage);

    return model;
  }

  static mapList(list: Ammo[] = []): Ammo[] {
    const result = list.map((item) => this.map(item));

    return result;
  }
}
