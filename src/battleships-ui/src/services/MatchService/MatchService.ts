import axios from 'axios';
import { Match } from '../../models/Match';

const api = axios.create({
  baseURL: 'https://localhost:7072/',
});

export class MatchService {
  private static endpointUrl = 'matches/';

  static async get(id: number): Promise<Match> {
    const response = await api.get(this.endpointUrl + `${id}`);

    return response.data;
  }

  static async createNew(): Promise<Match> {
    const response = await api.get(this.endpointUrl);

    return response.data;
  }
}
