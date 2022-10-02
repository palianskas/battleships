import axios from 'axios';
import { Match } from '../../models/Match';
import { GameMode } from '../../models/MatchSettings';
import Ship from '../../models/Ships/Ship';
import { ShipClass } from '../../models/Ships/ShipClass';
import ClassicShipFactory from '../Factories/ShipFactories/ClassicShipFactory';
import ModularShipFactory from '../Factories/ShipFactories/ModularShipFactory';
import ObservingShipFactory from '../Factories/ShipFactories/ObservingShipFactory';
import { IShipFactory } from '../Factories/ShipFactories/ShipFactory';
import MatchProvider from '../MatchProvider/MatchProvider';

const api = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
});

export class MatchService {
  private static ENDPOINT_URL = 'matches/';
  private static LOCAL_STORAGE_MATCH_KEY = 'MATCH';

  static async get(): Promise<Match> {
    const response = await api.get(this.ENDPOINT_URL);

    return response.data;
  }

  static async createNew(name = 'New match'): Promise<Match> {
    const response = await api.post(this.ENDPOINT_URL, { name: name });

    return response.data;
  }

  static saveToLocalStorage(match: Match) {
    localStorage.setItem(this.LOCAL_STORAGE_MATCH_KEY, JSON.stringify(match));
  }

  static getFromLocalStorage(): Match | null {
    const value = localStorage.getItem(this.LOCAL_STORAGE_MATCH_KEY);

    if (value == null) {
      return null;
    }

    return JSON.parse(value);
  }

  static initMatchPlayerVehicles(): void {
    const match = MatchProvider.Instance.match;

    const factory = this.getShipFactoryByGameType(match);

    match.players.forEach((player) => {
      player.ships = this.getShipSet(factory);
    });
  }

  private static getShipFactoryByGameType(match: Match): IShipFactory {
    switch (match.settings.gameMode) {
      case GameMode.Classic: {
        return ClassicShipFactory.Instance;
      }
      case GameMode.Ammo: {
        return ModularShipFactory.Instance;
      }
      case GameMode.FogOfWar: {
        return ObservingShipFactory.Instance;
      }
    }
  }

  private static getShipSet(factory: IShipFactory): Ship[] {
    return [
      factory.create(ShipClass.Carrier),
      factory.create(ShipClass.Battleship),
      factory.create(ShipClass.Cruiser),
      factory.create(ShipClass.Submarine),
      factory.create(ShipClass.Speedboat),
    ];
  }
}
