import axios from 'axios';
import { Player } from '../../models/Player';

const api = axios.create({
  baseURL: 'https://localhost:7072/api/',
});

export class PlayerService {
  private static ENDPOINT_URL = 'players/';
  private static LOCAL_STORAGE_PLAYER_KEY = 'PLAYER';

  static async get(id: number): Promise<Player> {
    const response = await api.get(this.ENDPOINT_URL + `${id}`);

    return response.data;
  }

  static async createNew(name: string): Promise<Player> {
    const response = await api.get(this.ENDPOINT_URL, {
      params: { name: name },
    });

    return response.data;
  }

  static saveToLocalStorage(player: Player) {
    localStorage.setItem(this.LOCAL_STORAGE_PLAYER_KEY, JSON.stringify(player));
  }

  static getFromLocalStorage(): Player | null {
    const value = localStorage.getItem(this.LOCAL_STORAGE_PLAYER_KEY);

    if (value == null) {
      return null;
    }

    return JSON.parse(value);
  }
}