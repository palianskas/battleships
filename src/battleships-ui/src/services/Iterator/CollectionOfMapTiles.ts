import { Container } from "./Container";
import { Iterator } from "./Iterator";
import MatchMap, { MapTile } from "../../models/MatchMap";
import Ship from "../../models/Ships/Ship";

export default class CollectionOfTiles implements Container {
    static matchMap = new MatchMap();
    static tiles: MapTile[][] = this.matchMap.tiles;

    public getIterator(): Iterator {
        return new this.CollectionOfTilesIterate();
    }

    private CollectionOfTilesIterate = class implements Iterator {
    i!:number;

    hasNext(): boolean {
        if (this.i < CollectionOfTiles.tiles.length) {
            return true;
        }
        return false;
    }
    next(): object {
        if (this.hasNext()) {
            return CollectionOfTiles.tiles[this.i++];
        }
        return [];
    }
}
}
