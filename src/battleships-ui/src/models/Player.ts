export enum PlayerTeam {
  Blue = 'Blue',
  Red = 'Red',
}

export class Player {
  name!: string;
  team!: PlayerTeam;

  constructor(object: Partial<Player>) {
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
