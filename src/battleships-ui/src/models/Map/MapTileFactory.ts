import { TileColor } from './TileColors';
import { TileIcon } from './TileIcons';

export enum MapTileStatus {
  none,
  attacked,
  shipPartDestroyed,
  selected
}

export class MapTileType {
  readonly color: string;
  readonly icon: string;
  readonly status: MapTileStatus;

  constructor(status: MapTileStatus){
    switch(status){
      case MapTileStatus.attacked:
        this.color = TileColor.yellow;
        this.icon = TileIcon.none;
        break;
      case MapTileStatus.shipPartDestroyed:
        this.color = TileColor.red;
        this.icon = TileIcon.none;
        break;
      case MapTileStatus.selected:
        this.color = TileColor.grey;
        this.icon = TileIcon.none;
        break;
      case MapTileStatus.none:
        this.color = TileColor.transparent;
        this.icon = TileIcon.none;
    }
    this.status = status;
  }
}

export class MapTileFactory {
  private static mapTileTypes: MapTileType[] = [];

  static getType(status: MapTileStatus){
    const newType = new MapTileType(status)
    const type = this.mapTileTypes.find((mt) => mt === newType);
    if(!type){
      this.mapTileTypes.push(newType);
    } else {
      return type;
    }
  }
}
