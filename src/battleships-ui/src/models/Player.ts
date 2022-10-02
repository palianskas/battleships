import Ship from './Ships/Ship';

export enum PlayerTeam {
  Blue = 'Blue',
  Red = 'Red',
}

export class Player {
  id: number;
  name: string;
  team: PlayerTeam;
  ships: Ship[];

  constructor(object: Partial<Player>) {
    this.id = object.id ?? Math.round(Math.random() * 1000);
    this.name = object.name ?? 'New player';
    this.team = !!object.team ? PlayerTeam[object.team] : PlayerTeam.Blue;
    this.ships = object.ships ?? [];
  }

  static mapList(objects?: Partial<Player>[]): Player[] {
    if (objects == null) {
      return [];
    }

    return objects.map((object) => new Player(object));
  }

  public invertTeam() {
    this.team =
      this.team === PlayerTeam.Blue ? PlayerTeam.Red : PlayerTeam.Blue;
  }
}
