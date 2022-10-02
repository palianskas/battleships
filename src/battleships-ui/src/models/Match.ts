import MatchSettings from './MatchSettings';
import { Player } from './Player';

export class Match {
  name: string;
  isPregame: boolean;
  players: Player[];
  settings: MatchSettings = new MatchSettings();

  constructor(object?: Partial<Match>) {
    this.name = object?.name ?? 'New match';
    this.isPregame = object?.isPregame ?? true;
    this.players = Player.mapList(object?.players);
    this.settings = new MatchSettings(object?.settings);
  }
}
