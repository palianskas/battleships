import { Match } from '../../models/Match';
import MatchProvider from './MatchProvider';

jest.mock('../../models/Match');

describe('MatchProvider', () => {
  let instance;

  beforeEach(() => {
    instance = new MatchProvider();
  });

  it('instance should be an instanceof MatchProvider', () => {
    expect(instance instanceof MatchProvider).toBeTruthy();
  });
});