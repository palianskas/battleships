import MatchMap, { MapTile } from '../../../models/MatchMap';
import { ShipClass } from '../../../models/Ships/ShipClass';
import { AttackStrategyDecorator } from '../../Decorators/AttackStrategyDecorators/AttackStrategyDecorator';
import LoggerService, { PatternTypes } from '../../LoggerService/LoggerService';
import {
  DefaultAttackStrategy,
  DamageAttackStrategy,
  ShipSpecificAttackStrategy,
} from './AttackStrategies';

export class StandardAttackStrategy extends AttackStrategyDecorator {
  private logger = LoggerService.Instance.getLogger(PatternTypes.Strategy);

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
    const log = `StandardAttackStrategy.attack() on (${tile.x}:${tile.y})`;
    this.strategyLogger.log(log);
    this.decoratorLogger.log(log);

    this.baseAttackStrategy!.attack(tile, map);
  }
}
