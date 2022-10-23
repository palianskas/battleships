import { Match } from '../../models/Match';
import MatchProvider from './MatchProvider';

jest.mock('../../models/Match');

describe('MatchProvider', () => {
  let instance: any;

  beforeEach(() => {
    instance = MatchProvider.Instance;
  });

  it('instance should be an instanceof MatchProvider', () => {
    expect(instance instanceof MatchProvider).toBeTruthy();
  });
});
