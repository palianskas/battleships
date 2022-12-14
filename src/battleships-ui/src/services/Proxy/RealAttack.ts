import MatchMap, { MapTile } from "../../models/MatchMap";
import { IAttackStrategy } from "../Strategies/AttackStrategies/AttackStrategies";

export class RealAttack implements IAttackStrategy  {
    
    private tile: MapTile;
    private map: MatchMap;

    constructor (tile: MapTile, map:MatchMap)
    {
        this.tile = tile;
        this.map =map;
        this.loadFromDisk(tile,map);
    }
    attack(tile: MapTile, map: MatchMap): void {
        const log = `DefaultAttackStrategy.attack() on (${tile.x}:${tile.y})`;

    tile.isAttacked = true;
    }
    private loadFromDisk(tile: MapTile, map: MatchMap){
        const log = `DefaultAttackStrategy.loadfromDisk() on (${tile.x}:${tile.y})`;

        tile.isAttacked = true;

    }
    

}