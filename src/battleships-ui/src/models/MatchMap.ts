import { ShipPart } from './Ships/ShipPart';

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

  isAttacked = false;
  isShipPartDestroyed = false;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }
}
const shallowCopy = <T>(obj: T): T => {
    return Object.assign({}, obj);
}
