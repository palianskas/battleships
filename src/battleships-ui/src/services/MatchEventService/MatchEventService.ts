import {
  HubConnectionBuilder,
  HttpTransportType,
  HubConnection,
} from '@microsoft/signalr';

const HUB_ENDPOINT_URL = 'match-event-hub/';

export default class MatchEventService {
  private _connection: HubConnection;

  private static _instance: MatchEventService;

  private constructor() {
    this._connection = new HubConnectionBuilder()
      .withUrl(process.env.REACT_APP_BASE_URL + HUB_ENDPOINT_URL, {
        skipNegotiation: true,
        transport: HttpTransportType.WebSockets,
      })
      .withAutomaticReconnect()
      .build();

    this._connection.on(
      'ReceiveEvent',
      function (event: MatchEventNames, data: string) {
        console.log(event, data);
      }
    );
  }

  public static get Instance(): MatchEventService {
    MatchEventService._instance ??= new MatchEventService();

    return MatchEventService._instance;
  }

  public async sendEvent(event: MatchEventNames, data: any = {}) {
    data = JSON.stringify(data);

    await this._connection.start();

    this._connection.send('PropagateEvent', event, data);
  }
}

export enum MatchEventNames {
  MatchCreated,
  PlayerJoined,
  PlayerStartedMatch,
  PlayerUpdatedMatchSettings,
}
