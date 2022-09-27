import MatchSettings from './MatchSettings';
import { Player } from './Player';

export class Match {
  id!: number;
  name!: string;
  isPregame!: boolean;
  players!: Player[];
  settings: MatchSettings = new MatchSettings();
}
