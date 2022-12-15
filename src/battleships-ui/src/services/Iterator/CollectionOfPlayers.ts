import { Container } from "./Container";
import { Iterator } from "./Iterator";
import { Match } from "../../models/Match";
import { Player } from "../../models/Player";

export default class CollectionOfPlayers implements Container {
    static match = new Match();
    static players: Player[] = this.match.players;


    public getIterator(): Iterator {
        return new this.CollectionOfPlayersIterate();
    }


    private CollectionOfPlayersIterate = class implements Iterator {
    i!:number;

    hasNext(): boolean {
        if (this.i < CollectionOfPlayers.players.length) {
            return true;
        }
        return false;
    }
    next(): object {
        if (this.hasNext()) {
            return CollectionOfPlayers.players[this.i++];
        }
        return [];
    }
}
}
