import MatchMap, { MapTile } from '../../../models/MatchMap';
import { AttackStrategyDecorator } from '../../Decorators/AttackStrategyDecorators/AttackStrategyDecorator';
import { DefaultAttackStrategy } from './AttackStrategies';
import { MapTileFactory, MapTileStatus } from '../../../models/Map/MapTileFactory';
import { TileIcon } from '../../../models/Map/TileIcons';
import { TileColor } from '../../../models/Map/TileColors';

export class ClassicAttackStrategy extends AttackStrategyDecorator {
  constructor() {
    super();

    this.baseAttackStrategy = new DefaultAttackStrategy();
  }

  attack(tile: MapTile, map: MatchMap): void {
    const log = `ClassicAttackStrategy.attack() on (${tile.x}:${tile.y})`;
    this.strategyLogger.log(log);
    this.decoratorLogger.log(log);

    this.baseAttackStrategy!.attack(tile, map);

    if (!!tile.shipPart) {
      tile.shipPart.isDestroyed = true;
      tile.type = MapTileFactory.getType(MapTileStatus.shipPartDestroyed)!;
    }
  }
}
