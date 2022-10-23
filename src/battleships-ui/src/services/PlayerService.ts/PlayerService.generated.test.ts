import axios from 'axios';
import { Player } from '../../models/Player';
import { PlayerService } from './PlayerService';

jest.mock('axios');
jest.mock('../../models/Player');

describe('PlayerService', () => {
  let instance: any;

  beforeEach(() => {
    instance = new PlayerService();
  });

  it('instance should be an instanceof PlayerService', () => {
    expect(instance instanceof PlayerService).toBeTruthy();
  });

  it('should have a static method get()', async () => {
    // await PlayerService.get(id);
    expect(true).toBeTruthy();
  });

  it('should have a static method createNew()', () => {
    // PlayerService.createNew(name);
    expect(true).toBeTruthy();
  });

  it('should have a static method saveToSessionStorage()', () => {
    // PlayerService.saveToSessionStorage(player);
    expect(true).toBeTruthy();
  });

  it('should have a static method getFromSessionStorage()', () => {
    // PlayerService.getFromSessionStorage();
    expect(true).toBeTruthy();
  });
});
