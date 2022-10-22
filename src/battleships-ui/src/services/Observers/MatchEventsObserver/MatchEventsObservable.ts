import { IObservable } from '../Observer';

export default class MatchEventsObservable implements IObservable {
  constructor(onNotify: (data: string) => void) {
    this.onNotify = onNotify;
  }

  onNotify: (data: string) => void;
}
