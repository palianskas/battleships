import MatchMap, { MapTile } from '../../../models/MatchMap';
import { IAttackStrategy } from '../../Strategies/AttackStrategies/AttackStrategies';

export abstract class AttackStrategyDecorator implements IAttackStrategy {
  protected baseAttackStrategy?: AttackStrategyDecorator;

  abstract attack(tile: MapTile, map: MatchMap): void;
}
