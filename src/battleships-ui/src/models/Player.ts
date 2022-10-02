export enum PlayerTeam {
  Blue = 'Blue',
  Red = 'Red',
}

export class Player {
  id: number;
  name: string;
  team: PlayerTeam;

  constructor(object: Partial<Player>) {
    this.id = Math.round(Math.random() * 1000);
    this.name = object.name ?? 'New player';
    this.team = !!object.team ? PlayerTeam[object.team] : PlayerTeam.Blue;
  }

  static mapList(objects?: Partial<Player>[]): Player[] {
    if (objects == null) {
      return [];
    }

    return objects.map((object) => new Player(object));
  }
}
