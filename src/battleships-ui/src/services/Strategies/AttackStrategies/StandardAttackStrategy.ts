import MatchMap, { MapTile } from '../../../models/MatchMap';
import { ShipClass } from '../../../models/Ships/ShipClass';
import { AttackStrategyDecorator } from '../../Decorators/AttackStrategyDecorators/AttackStrategyDecorator';
import {
  DefaultAttackStrategy,
  DamageAttackStrategy,
  ShipSpecificAttackStrategy,
} from './AttackStrategies';

export class StandardAttackStrategy extends AttackStrategyDecorator {
  constructor(damage: number) {
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

    this.baseAttackStrategy = shipSpecificAttackStrategy;
  }

  attack(tile: MapTile, map: MatchMap): void {
    this.baseAttackStrategy!.attack(tile, map);
    console.log(`standard attack on ${tile.x}-${tile.y}`);
  }
}
