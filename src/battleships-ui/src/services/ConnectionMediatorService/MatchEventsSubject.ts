import MatchEventsObservable from './MatchEventsObservable';
import { MatchEventNames } from './ConnectionMediatorService';

export default abstract class MatchEventsSubject {
  protected observersByEvent: { [event: number]: MatchEventsObservable[] } = {};

  constructor() {
    for (const event in MatchEventNames) {
      // iterator contains `number` keys, then `string` values
      if (isNaN(Number(event))) {
        break;
      }

      this.observersByEvent[event] = [];
    }
  }

  public notify(event: MatchEventNames, data: any) {
    const eventObservers = this.observersByEvent[event];

    eventObservers?.forEach((observer) => observer.onNotify(data));
  }

  public add(event: MatchEventNames, action: (data: string) => void) {
    this.observersByEvent[event].push(new MatchEventsObservable(action));
  }
}
