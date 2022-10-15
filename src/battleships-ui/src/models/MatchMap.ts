export default class MatchMap {
  tiles: MapTile[][];

  constructor(sizeX = 10, sizeY = 10) {
    this.tiles = [];

    for (let i = 0; i < sizeX; i++) {
      const row: MapTile[] = [];
      this.tiles.push(row);
      for (let j = 0; j < sizeY; j++) {
        row.push(new MapTile(i, j, this));
      }
    }
  }
}

export class MapTile {
  x: number;
  y: number;

  isAttacked = Math.random() > 0.5;
  isShipPartDestroyed = Math.random() > 0.9;

  map: MatchMap;

  constructor(x: number, y: number, map: MatchMap) {
    this.x = x;
    this.y = y;

    this.map = map;
  }
}
