import {
  HubConnectionBuilder,
  HttpTransportType,
  HubConnection,
} from '@microsoft/signalr';
import MatchEventsSubject from '../Observers/MatchEventsObserver/MatchEventsSubject';
import ConnectionMediatorService from './ConnectionMediatorService';

jest.mock('@microsoft/signalr');
jest.mock('../Observers/MatchEventsObserver/MatchEventsSubject');

describe('ConnectionMediatorService', () => {
  let instance;

  beforeEach(() => {
    instance = new ConnectionMediatorService();
  });

  it('instance should be an instanceof ConnectionMediatorService', () => {
    expect(instance instanceof ConnectionMediatorService).toBeTruthy();
  });

  it('should have a method sendEvent()', async () => {
    // await instance.sendEvent(event,data);
    expect(false).toBeTruthy();
  });

  it('should have a method handleSendEvent()', async () => {
    // await instance.handleSendEvent(event,data);
    expect(false).toBeTruthy();
  });

  it('should have a method start()', async () => {
    // await instance.start();
    expect(false).toBeTruthy();
  });
});