import { MatchEventNames } from '../../ConnectionMediatorService/ConnectionMediatorService';
import { ISubject } from '../Observer';
import MatchEventsObservable from './MatchEventsObservable';
import MatchEventsSubject from './MatchEventsSubject';

jest.mock('../../ConnectionMediatorService/ConnectionMediatorService');
jest.mock('../Observer');
jest.mock('./MatchEventsObservable');

describe('MatchEventsSubject', () => {
  let instance;

  beforeEach(() => {
    instance = new MatchEventsSubject();
  });

  it('instance should be an instanceof MatchEventsSubject', () => {
    expect(instance instanceof MatchEventsSubject).toBeTruthy();
  });

  it('should have a method notify()', () => {
    // instance.notify(event,data);
    expect(false).toBeTruthy();
  });

  it('should have a method add()', () => {
    // instance.add(event,action);
    expect(false).toBeTruthy();
  });

  it('should have a method addSingular()', () => {
    // instance.addSingular(event,action);
    expect(false).toBeTruthy();
  });
});