import ConnectionMediatorService, {
  MatchEventNames,
} from './ConnectionMediatorService';

/**
 * Integration tests
 *
 * @group integration/connection-mediator-service
 * @group todo/connection-mediator-service
 */

beforeAll(() => {
  process.env.REACT_APP_BASE_URL = 'http://localhost:7072/api/';
});

beforeEach(() => {
  jest.resetAllMocks();
});

describe('sendEvent(event, data)', () => {
  test('Should send event with data', () => {
    const handleSendEventSpy = jest.spyOn<ConnectionMediatorService, any>(
      ConnectionMediatorService.Instance,
      'handleSendEvent'
    );

    ConnectionMediatorService.Instance.sendEvent(MatchEventNames.NewMatch);

    expect(handleSendEventSpy).toBeCalledTimes(1);
  });

  // TODO: fix websocket connection setup
  test.each([
    { event: MatchEventNames.AttackPerformed, data: { data: 'data 1' } },
    { event: MatchEventNames.MatchCreated, data: { data: 'data 2' } },
    { event: MatchEventNames.NewMatch, data: { data: 'data 3' } },
    { event: MatchEventNames.PlayerJoined, data: { data: 'data 4' } },
    { event: MatchEventNames.PlayerLockedInSettings, data: { data: 'data 5' } },
    {
      event: MatchEventNames.PlayerUpdatedMatchSettings,
      data: { data: 'data 6' },
    },
    {
      event: MatchEventNames.SecondPlayerJoinedConfirmation,
      data: { data: 'data 7' },
    },
  ])('Should received propagated events with data', ({ event, data }) => {
    const observableCallback = jest.fn((data: any) => {});

    ConnectionMediatorService.Instance.add(event, observableCallback);

    ConnectionMediatorService.Instance.sendEvent(event, data);

    expect(observableCallback).toBeCalledTimes(1);
    expect(observableCallback).toBeCalledWith(data);
  });
});
