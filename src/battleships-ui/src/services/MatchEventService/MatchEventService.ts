import {
  HubConnectionBuilder,
  HttpTransportType,
  HubConnection,
} from '@microsoft/signalr';
import MatchEventsSubject from './MatchEventsSubject';

const HUB_ENDPOINT_URL = 'match-event-hub/';

export default class MatchEventsService extends MatchEventsSubject {
  private _connection: HubConnection;

  private static _instance: MatchEventsService;

  private constructor() {
    super();

    this._connection = new HubConnectionBuilder()
      .withUrl(process.env.REACT_APP_BASE_URL + HUB_ENDPOINT_URL, {
        skipNegotiation: true,
        transport: HttpTransportType.WebSockets,
      })
      .withAutomaticReconnect()
      .build();

    this._connection.start();

    this._connection.onclose(async () => {
      await this.start();
    });

    this._connection.on(
      'ReceiveEvent',
      (event: MatchEventNames, data: string) => {
        this.notify(event, data);
      }
    );
  }

  public static get Instance(): MatchEventsService {
    MatchEventsService._instance ??= new MatchEventsService();

    return MatchEventsService._instance;
  }

  public async sendEvent(event: MatchEventNames, data: any = {}) {
    data = JSON.stringify(data);

    try {
      await this._connection.send('PropagateEvent', event, data);
    } catch (err) {
      setTimeout(() => this.sendEvent(event, data), 1000);
    }
  }

  private async start() {
    try {
      await this._connection.start();
    } catch (err) {
      setTimeout(this.start, 1000);
    }
  }
}

export enum MatchEventNames {
  NewMatch,
  MatchCreated,
  PlayerJoined,
  SecondPlayerConfirmation,
  PlayerStartedMatch,
  PlayerUpdatedMatchSettings,
}
