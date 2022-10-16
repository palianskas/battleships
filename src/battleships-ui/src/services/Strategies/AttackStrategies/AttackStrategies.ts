import MatchMap, { MapTile } from '../../../models/MatchMap';
import { ShipClass } from '../../../models/Ships/ShipClass';
import { ModularShipPart } from '../../../models/Ships/ShipPart';
import MatchProvider from '../../MatchProvider/MatchProvider';

export interface IAttackStrategy {
  attack(tile: MapTile, map: MatchMap): void;
}

export class BaseAttackStrategy implements IAttackStrategy {
  attack(tile: MapTile, map: MatchMap): void {
    tile.isAttacked = true;

    console.log(`base attack on ${tile.x}-${tile.y}`);
  }
}

export class DamageAttackStrategy implements IAttackStrategy {
  private damage: number;

  private baseAttackStrategy: IAttackStrategy;

  constructor(baseAttackStrategy: IAttackStrategy, damage: number) {
    this.baseAttackStrategy = baseAttackStrategy;
    this.damage = damage;
  }

  attack(tile: MapTile, map: MatchMap): void {
    this.baseAttackStrategy.attack(tile, map);

    console.log('1', tile.shipPart);
    if (!!tile.shipPart) {
      const shipPart = tile.shipPart as ModularShipPart;

      shipPart.hp -= this.damage;

      if (shipPart.hp <= 0) {
        shipPart.hp = 0;
        shipPart.isDestroyed = true;
        tile.isShipPartDestroyed = true;
      }
    }
    console.log('2', tile.shipPart);

    console.log(`damage(${this.damage}) attack on ${tile.x}-${tile.y}`);
  }
}

export class AreaAttackStrategy implements IAttackStrategy {
  private impactRadius: number;

  private baseAttackStrategy: IAttackStrategy;

  constructor(baseAttackStrategy: IAttackStrategy, impactRadius: number) {
    this.baseAttackStrategy = baseAttackStrategy;
    this.impactRadius = impactRadius;
  }

  attack(tile: MapTile, map: MatchMap): void {
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
        if (i < 0 || i > map.tiles.length || j < 0 || j > map.tiles.length) {
          continue;
        }

        const tile = map.tiles[i][j];
        this.baseAttackStrategy.attack(tile, map);
        console.log(`area(${this.impactRadius}) attack on ${tile.x}-${tile.y}`);
      }
    }
  }
}

export class CooldownAttackStrategy implements IAttackStrategy {
  private cooldown: number;

  private baseAttackStrategy: IAttackStrategy;

  constructor(baseAttackStrategy: IAttackStrategy, cooldown: number) {
    this.baseAttackStrategy = baseAttackStrategy;
    this.cooldown = cooldown;
  }

  attack(tile: MapTile, map: MatchMap): void {
    this.baseAttackStrategy.attack(tile, map);

    const player = MatchProvider.Instance.match.players[0];

    if (player.attackTurns.length > this.cooldown) {
      player.attackTurns.reverse().splice(0, this.cooldown).reverse();
    } else {
      player.turnOverDraw += this.cooldown;
    }

    console.log(`cooldown(${this.cooldown}) attack on ${tile.x}-${tile.y}`);
  }
}

export class ShipSpecificAttackStrategy implements IAttackStrategy {
  private affectedClasses: ShipClass[];

  private baseAttackStrategy: IAttackStrategy;

  constructor(
    baseAttackStrategy: IAttackStrategy,
    affectedClasses: ShipClass[]
  ) {
    this.baseAttackStrategy = baseAttackStrategy;
    this.affectedClasses = affectedClasses;
  }

  attack(tile: MapTile, map: MatchMap): void {
    if (
      !tile.shipPart ||
      this.affectedClasses.includes(tile.shipPart.shipClass)
    ) {
      this.baseAttackStrategy.attack(tile, map);

      console.log(
        `ship specific(${this.affectedClasses}) attack on ${tile.x}-${tile.y}`
      );
    }
  }
}
