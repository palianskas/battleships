import MatchMap, { MapTile } from '../../../models/MatchMap';
import { ShipClass } from '../../../models/Ships/ShipClass';
import {
  BaseAttackStrategy,
  CooldownAttackStrategy,
  DamageAttackStrategy,
  IAttackStrategy,
  ShipSpecificAttackStrategy,
} from './AttackStrategies';

export class ArmorPiercingAttackStrategy implements IAttackStrategy {
  baseAttackStrategy: IAttackStrategy;

  constructor(cooldown: number, damage: number) {
    const defaultAttackStrategy = new BaseAttackStrategy();
    const damageAttackStrategy = new DamageAttackStrategy(
      defaultAttackStrategy,
      damage
    );

    const affectedClasses = [
      ShipClass.Carrier,
      ShipClass.Battleship,
      ShipClass.Cruiser,
      ShipClass.Speedboat,
    ];
    const shipSpecificAttackStrategy = new ShipSpecificAttackStrategy(
      damageAttackStrategy,
      affectedClasses
    );
    const cooldownAttackStrategy = new CooldownAttackStrategy(
      shipSpecificAttackStrategy,
      cooldown
    );

    this.baseAttackStrategy = cooldownAttackStrategy;
  }

  attack(tile: MapTile, map: MatchMap): void {
    this.baseAttackStrategy.attack(tile, map);
    console.log(`armor piercing attack on ${tile.x}-${tile.y}`);
  }
}
