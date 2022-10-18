import MatchMap, { MapTile } from '../../../models/MatchMap';
import { ShipClass } from '../../../models/Ships/ShipClass';
import { AttackStrategyDecorator } from '../../Decorators/AttackStrategyDecorators/AttackStrategyDecorator';
import {
  AreaAttackStrategy,
  DefaultAttackStrategy,
  DamageAttackStrategy,
  ShipSpecificAttackStrategy,
} from './AttackStrategies';

export class HighExplosiveAttackStrategy extends AttackStrategyDecorator {
  constructor(damage: number, impactRadius: number) {
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
    const areaAttackStrategy = new AreaAttackStrategy(
      shipSpecificAttackStrategy,
      impactRadius
    );

    this.baseAttackStrategy = areaAttackStrategy;
  }

  attack(tile: MapTile, map: MatchMap): void {
    this.baseAttackStrategy!.attack(tile, map);
    console.log(`high explosive attack on ${tile.x}-${tile.y}`);
  }
}
