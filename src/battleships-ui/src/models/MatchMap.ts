import { ShipPart } from './Ships/ShipPart';
import { TileColor } from './Map/TileColors';
import { MapTileFactory, MapTileStatus, MapTileType } from './Map/MapTileFactory';
import { TileIcon } from './Map/TileIcons';

export default class MatchMap {
  tiles: MapTile[][];

  constructor(sizeX = 10, sizeY = 10) {
    this.tiles = [];

    for (let i = 0; i < sizeX; i++) {
      const row: MapTile[] = [];
      this.tiles.push(row);
      for (let j = 0; j < sizeY; j++) {
        row.push(new MapTile(i, j));
      }
    }
  }
}

export class MapTile {
  x: number;
  y: number;

  shipPart?: ShipPart;

  type: MapTileType;


  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
    this.type = MapTileFactory.getType(MapTileStatus.none)!;
  }
}
