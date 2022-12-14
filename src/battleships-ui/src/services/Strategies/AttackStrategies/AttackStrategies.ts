import MatchMap, { MapTile } from '../../../models/MatchMap';
import { ShipClass } from '../../../models/Ships/ShipClass';
import { ModularShipPart } from '../../../models/Ships/ShipPart';
import { AttackStrategyDecorator } from '../../Decorators/AttackStrategyDecorators/AttackStrategyDecorator';
import MatchProvider from '../../MatchProvider/MatchProvider';

export interface IAttackStrategy {
  attack(tile: MapTile, map: MatchMap): void;
}

export class DefaultAttackStrategy extends AttackStrategyDecorator {
  attack(tile: MapTile, map: MatchMap): void {
    const log = `DefaultAttackStrategy.attack() on (${tile.x}:${tile.y})`;
    this.decoratorLogger.log(log);

    tile.isAttacked = true;
  }
}

export class DamageAttackStrategy extends AttackStrategyDecorator {
  private damage: number;

  constructor(baseAttackStrategy: AttackStrategyDecorator, damage: number) {
    super();

    this.baseAttackStrategy = baseAttackStrategy;
    this.damage = damage;
  }

  attack(tile: MapTile, map: MatchMap): void {
    const log = `DamageAttackStrategy.attack() on (${tile.x}:${tile.y})`;
    this.decoratorLogger.log(log);

    this.baseAttackStrategy!.attack(tile, map);

    if (!!tile.shipPart) {
      const shipPart = tile.shipPart as ModularShipPart;

      shipPart.hp -= this.damage;

      if (shipPart.hp <= 0) {
        shipPart.hp = 0;
        shipPart.isDestroyed = true;
        tile.isShipPartDestroyed = true;
      }
    }
  }
}

export class AreaAttackStrategy extends AttackStrategyDecorator {
  private impactRadius: number;

  constructor(
    baseAttackStrategy: AttackStrategyDecorator,
    impactRadius: number
  ) {
    super();

    this.baseAttackStrategy = baseAttackStrategy;
    this.impactRadius = impactRadius;
  }

  attack(tile: MapTile, map: MatchMap): void {
    const log = `AreaAttackStrategy.attack() on (${tile.x}:${tile.y})`;
    this.decoratorLogger.log(log);

    for (
      let i = tile.x - (this.impactRadius - 1);
      i < tile.x + this.impactRadius;
      i++
    ) {
      for (
        let j = tile.y - (this.impactRadius - 1);
        j < tile.y + this.impactRadius;
        j++
      ) {
        if (i < 0 || i >= map.tiles.length || j < 0 || j >= map.tiles.length) {
          continue;
        }

        const tile = map.tiles[i][j];
        this.baseAttackStrategy!.attack(tile, map);
      }
    }
  }
}

export class CooldownAttackStrategy extends AttackStrategyDecorator {
  private cooldown: number;

  constructor(baseAttackStrategy: AttackStrategyDecorator, cooldown: number) {
    super();

    this.baseAttackStrategy = baseAttackStrategy;
    this.cooldown = cooldown;
  }

  attack(tile: MapTile, map: MatchMap): void {
    const log = `CooldownAttackStrategy.attack() on (${tile.x}:${tile.y})`;
    this.decoratorLogger.log(log);

    this.baseAttackStrategy!.attack(tile, map);

    const player = MatchProvider.Instance.match.players[0];

    if (player.attackTurns.length > this.cooldown) {
      player.attackTurns.reverse().splice(0, this.cooldown).reverse();
    } else {
      player.turnOverDraw += this.cooldown;
    }
  }
}

export class ShipSpecificAttackStrategy extends AttackStrategyDecorator {
  private affectedClasses: ShipClass[];

  constructor(
    baseAttackStrategy: AttackStrategyDecorator,
    affectedClasses: ShipClass[]
  ) {
    super();

    this.baseAttackStrategy = baseAttackStrategy;
    this.affectedClasses = affectedClasses;
  }

  attack(tile: MapTile, map: MatchMap): void {
    const log = `ShipSpecificAttackStrategy.attack() on (${tile.x}:${tile.y})`;
    this.decoratorLogger.log(log);

    if (
      !tile.shipPart ||
      this.affectedClasses.includes(tile.shipPart.shipClass)
    ) {
      this.baseAttackStrategy!.attack(tile, map);
    }
  }
}
