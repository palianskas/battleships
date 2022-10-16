import MatchMap, { MapTile } from '../../../models/MatchMap';
import { ShipClass } from '../../../models/Ships/ShipClass';
import {
  AreaAttackStrategy,
  BaseAttackStrategy,
  DamageAttackStrategy,
  IAttackStrategy,
  ShipSpecificAttackStrategy,
} from './AttackStrategies';

export class HighExplosiveAttackStrategy implements IAttackStrategy {
  baseAttackStrategy: IAttackStrategy;

  constructor(damage: number, impactRadius: number) {
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
    const areaAttackStrategy = new AreaAttackStrategy(
      shipSpecificAttackStrategy,
      impactRadius
    );

    this.baseAttackStrategy = areaAttackStrategy;
  }

  attack(tile: MapTile, map: MatchMap): void {
    this.baseAttackStrategy.attack(tile, map);
    console.log(`high explosive attack on ${tile.x}-${tile.y}`);
  }
}
