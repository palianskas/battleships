import { Container } from "./Container";
import { Iterator } from "./Iterator";
import { Player } from "../../models/Player";
import Ship from "../../models/Ships/Ship";

export default class CollectionOfShips implements Container {
    static data: any;
    static player = new Player(CollectionOfShips.data.player);
    static ships: Ship[] = this.player.ships;


    public getIterator(): Iterator {
        return new this.CollectionOfShipsIterate();
    }


    private CollectionOfShipsIterate = class implements Iterator {
    i!:number;

    hasNext(): boolean {
        if (this.i < CollectionOfShips.ships.length) {
            return true;
        }
        return false;
    }
    next(): object {
        if (this.hasNext()) {
            return CollectionOfShips.ships[this.i++];
        }
        return [];
    }
}
}
