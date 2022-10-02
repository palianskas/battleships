import axios from 'axios';
import { Player } from '../../models/Player';

const api = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
});

export class PlayerService {
  private static ENDPOINT_URL = 'players/';
  private static LOCAL_STORAGE_PLAYER_KEY = 'PLAYER';

  static async get(id: number): Promise<Player> {
    const response = await api.get(this.ENDPOINT_URL + `${id}`);

    return response.data;
  }

  static createNew(name: string): Player {
    const player = new Player({ name: name });

    this.saveToSessionStorage(player);

    return player;
  }

  static saveToSessionStorage(player: Player) {
    sessionStorage.setItem(
      this.LOCAL_STORAGE_PLAYER_KEY,
      JSON.stringify(player)
    );
  }

  static getFromSessionStorage(): Player | undefined {
    const value = sessionStorage.getItem(this.LOCAL_STORAGE_PLAYER_KEY);

    if (value == null) {
      return undefined;
    }

    return JSON.parse(value);
  }
}
