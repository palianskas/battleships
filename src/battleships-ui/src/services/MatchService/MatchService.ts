import axios from 'axios';
import { Match } from '../../models/Match';

const api = axios.create({
  baseURL: 'https://localhost:7072/api/',
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
}
