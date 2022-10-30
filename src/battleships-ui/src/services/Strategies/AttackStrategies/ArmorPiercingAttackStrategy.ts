import MatchMap, { MapTile } from '../../../models/MatchMap';
import { ShipClass } from '../../../models/Ships/ShipClass';
import { AttackStrategyDecorator } from '../../Decorators/AttackStrategyDecorators/AttackStrategyDecorator';
import {
  DefaultAttackStrategy,
  CooldownAttackStrategy,
  DamageAttackStrategy,
  ShipSpecificAttackStrategy,
} from './AttackStrategies';

export class ArmorPiercingAttackStrategy extends AttackStrategyDecorator {
  constructor(cooldown: number, damage: number) {
    super();

    const defaultAttackStrategy = new DefaultAttackStrategy();
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
    const log = `ArmorPiercingAttackStrategy.attack() on (${tile.x}:${tile.y})`;
    this.strategyLogger.log(log);
    this.decoratorLogger.log(log);

    this.baseAttackStrategy!.attack(tile, map);
  }
}
