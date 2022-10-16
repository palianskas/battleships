import MatchMap, { MapTile } from '../../../models/MatchMap';
import { ShipClass } from '../../../models/Ships/ShipClass';
import {
  AreaAttackStrategy,
  BaseAttackStrategy,
  DamageAttackStrategy,
  IAttackStrategy,
  ShipSpecificAttackStrategy,
} from './AttackStrategies';

export class DepthChargeAttackStrategy implements IAttackStrategy {
  baseAttackStrategy: IAttackStrategy;

  constructor(damage: number, impactRadius: number) {
    const defaultAttackStrategy = new BaseAttackStrategy();
    const damageAttackStrategy = new DamageAttackStrategy(
      defaultAttackStrategy,
      damage
    );

    const affectedClasses = [ShipClass.Submarine];
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
    this.baseAttackStrategy.attack(tile, map);
    console.log(`depth charge attack on ${tile.x}-${tile.y}`);
  }
}
