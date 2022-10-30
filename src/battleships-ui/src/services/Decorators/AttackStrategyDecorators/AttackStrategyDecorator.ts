import MatchMap, { MapTile } from '../../../models/MatchMap';
import LoggerService, { PatternTypes } from '../../LoggerService/LoggerService';
import { IAttackStrategy } from '../../Strategies/AttackStrategies/AttackStrategies';

export abstract class AttackStrategyDecorator implements IAttackStrategy {
  protected strategyLogger = LoggerService.Instance.getLogger(
    PatternTypes.Strategy
  );
  protected decoratorLogger = LoggerService.Instance.getLogger(
    PatternTypes.Decorator
  );

  protected baseAttackStrategy?: AttackStrategyDecorator;

  abstract attack(tile: MapTile, map: MatchMap): void;
}
