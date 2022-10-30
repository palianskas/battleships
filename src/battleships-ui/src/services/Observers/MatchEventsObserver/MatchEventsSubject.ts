import { MatchEventNames } from '../../ConnectionMediatorService/ConnectionMediatorService';
import LoggerService, { PatternTypes } from '../../LoggerService/LoggerService';
import { ISubject } from '../Observer';
import MatchEventsObservable from './MatchEventsObservable';

export default class MatchEventsSubject implements ISubject {
  private logger = LoggerService.Instance.getLogger(PatternTypes.Observer);
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

  public notify(event: MatchEventNames, data: any): void {
    const eventObservers = this.observersByEvent[event];

    this.logger.log(
      `MatchEventsSubject.notify(), event: ${MatchEventNames[event]}, found ${eventObservers.length} observers for event`
    );

    eventObservers?.forEach((observer) => observer.onNotify(data));
  }

  public add(event: MatchEventNames, action: (data: any) => void) {
    this.observersByEvent[event].push(new MatchEventsObservable(action));
  }

  public addSingular(event: MatchEventNames, action: (data: any) => void) {
    if (this.observersByEvent[event].length === 0) {
      this.observersByEvent[event].push(new MatchEventsObservable(action));
    }
  }
}
