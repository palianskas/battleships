export enum GameMode {
  Classic = 'Classic',
  Ammo = 'Ammo',
  FogOfWar = 'FogOfWar',
}

export default class MatchSettings {
  gameMode!: GameMode;
  useDice!: boolean;

  constructor() {
    this.gameMode = GameMode.Classic;
    this.useDice = false;
  }
}
