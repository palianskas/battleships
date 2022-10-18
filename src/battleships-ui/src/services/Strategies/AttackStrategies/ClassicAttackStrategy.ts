import MatchMap, { MapTile } from '../../../models/MatchMap';
import { AttackStrategyDecorator } from '../../Decorators/AttackStrategyDecorators/AttackStrategyDecorator';
import { DefaultAttackStrategy } from './AttackStrategies';

export class ClassicAttackStrategy extends AttackStrategyDecorator {
  constructor() {
    super();

    this.baseAttackStrategy = new DefaultAttackStrategy();
  }

  attack(tile: MapTile, map: MatchMap): void {
    this.baseAttackStrategy!.attack(tile, map);

    if (!!tile.shipPart) {
      tile.shipPart.isDestroyed = true;
      tile.isShipPartDestroyed = true;
    }

    console.log(`classic attack on ${tile.x}-${tile.y}`);
  }
}
