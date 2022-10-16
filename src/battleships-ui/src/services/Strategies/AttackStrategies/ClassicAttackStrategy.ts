import MatchMap, { MapTile } from '../../../models/MatchMap';
import { BaseAttackStrategy, IAttackStrategy } from './AttackStrategies';

export class ClassicAttackStrategy implements IAttackStrategy {
  baseAttackStrategy: IAttackStrategy;

  constructor() {
    this.baseAttackStrategy = new BaseAttackStrategy();
  }

  attack(tile: MapTile, map: MatchMap): void {
    this.baseAttackStrategy.attack(tile, map);

    if (!!tile.shipPart) {
      tile.shipPart.isDestroyed = true;
      tile.isShipPartDestroyed = true;
    }

    console.log(`classic attack on ${tile.x}-${tile.y}`);
  }
}
