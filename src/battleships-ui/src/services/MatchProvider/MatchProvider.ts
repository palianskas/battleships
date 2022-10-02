import { Match } from '../../models/Match';

export default class MatchProvider {
  match: Match;

  private static _instance: MatchProvider;

  private constructor() {
    this.match = new Match();
  }

  public static get Instance(): MatchProvider {
    MatchProvider._instance ??= new MatchProvider();

    return MatchProvider._instance;
  }
}
