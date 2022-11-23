import { AmmoType } from '../../models/Ammo';
import { MapTile } from '../../models/MatchMap';
import { Player } from '../../models/Player';
import { AttackTurn, PlayerTurn } from '../../models/Turns/AttackTurn';
import MatchProvider from '../MatchProvider/MatchProvider';
import { IAttackStrategy } from '../Strategies/AttackStrategies/AttackStrategies';

export interface ITurnHandler {
  perform(data: any): void;
}

export abstract class TurnHandler implements ITurnHandler {
  readonly perform = (data: any): void => {
    const player = this.getPlayer(data);
    const turn = this.getTurn(player);

    this.execute(player, turn, data);
    this.subtractTurn(player);

    this.postOperationHooks.forEach((hook, index) => {
      if (hook(data)) {
        this.postOperations[index](data);
      }
    });
  };

  protected abstract getPlayer(data: any): Player;
  protected abstract getTurn(player: Player): PlayerTurn;
  protected abstract execute(player: Player, turn: PlayerTurn, data: any): void;
  protected abstract subtractTurn(player: Player): void;

  protected abstract postOperations: { (data: any): void }[];
  protected abstract postOperationHooks: { (data: any): boolean }[];
}

export class AttackTurnHandler extends TurnHandler {
  constructor(
    private resolveAttackStrategy: { (ammoType: AmmoType): IAttackStrategy },
    postOperations: { (data: any): void }[] = [],
    postOperationHooks: { (data: any): boolean }[] = []
  ) {
    super();

    this.postOperations = postOperations;
    this.postOperationHooks = postOperationHooks;
  }

  protected getPlayer(data: any): Player {
    const { offencePlayerId } = data as AttackTurnEventProps;

    return MatchProvider.getPlayer(offencePlayerId)!;
  }
  protected getTurn(player: Player): PlayerTurn {
    return player.attackTurns[0];
  }
  protected execute(player: Player, turn: PlayerTurn, data: any): void {
    const { defencePlayerId, tile, ammoType } = data as AttackTurnEventProps;

    const defencePlayer = MatchProvider.getPlayer(defencePlayerId)!;
    const mapTile = defencePlayer.map.tiles[tile.x][tile.y];

    const attackTurn = turn as AttackTurn;
    attackTurn.attackStrategy = this.resolveAttackStrategy(ammoType);
    attackTurn.attackStrategy.attack(mapTile, defencePlayer.map);
  }
  protected subtractTurn(player: Player): void {
    if (player.attackTurns.length > 0) {
      player.attackTurns.shift();
    } else {
      player.turnOverDraw++;
    }
  }

  protected postOperations: ((data: any) => void)[];
  protected postOperationHooks: ((data: any) => boolean)[];
}

export class MovementTurnHandler extends TurnHandler {
  protected getPlayer(data: any): Player {
    throw new Error('Method not implemented.');
  }
  protected getTurn(player: Player): PlayerTurn {
    throw new Error('Method not implemented.');
  }
  protected execute(player: Player, turn: PlayerTurn, data: any): void {
    throw new Error('Method not implemented.');
  }
  protected subtractTurn(player: Player): void {
    throw new Error('Method not implemented.');
  }
  protected postOperations: ((data: any) => void)[] = [];
  protected postOperationHooks: ((data: any) => boolean)[] = [];
}

interface AttackTurnEventProps {
  offencePlayerId: number;
  defencePlayerId: number;
  tile: MapTile;
  ammoType: AmmoType;
}
