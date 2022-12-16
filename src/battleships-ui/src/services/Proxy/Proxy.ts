import MatchMap, { MapTile } from '../../models/MatchMap';
import { IAttackStrategy } from '../Strategies/AttackStrategies/AttackStrategies';
import { RealAttack } from './RealAttack';
import { MapTileStatus } from '../../models/Map/MapTileFactory';


export class Proxy implements IAttackStrategy  {
    private realAttack: RealAttack | undefined;
    private tile: MapTile;
    private map:MatchMap;

    constructor (tile: MapTile, map:MatchMap)
    {
        this.tile = tile;
        this.map = map;
    }
    attack(tile: MapTile, map: MatchMap): void {
        if(this.realAttack ==null ){
            this.realAttack = new RealAttack(tile, map);
            if(tile.type.status == MapTileStatus.attacked){
                console.log("tile has been attacked, try another tile");
            }
            
        }
        else this.realAttack.attack(tile,map);

    }

    

}
