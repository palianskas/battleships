import { IObservable } from '../Observer';
import MatchEventsObservable from './MatchEventsObservable';

jest.mock('../Observer');

describe('MatchEventsObservable', () => {
  let instance;

  beforeEach(() => {
    instance = new MatchEventsObservable();
  });

  it('instance should be an instanceof MatchEventsObservable', () => {
    expect(instance instanceof MatchEventsObservable).toBeTruthy();
  });
});