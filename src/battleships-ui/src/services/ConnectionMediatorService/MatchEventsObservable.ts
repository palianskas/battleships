export interface IObservable {
  onNotify(data: string): void;
}

export default class MatchEventsObservable implements IObservable {
  constructor(onNotify: (data: string) => void) {
    this.onNotify = onNotify;
  }

  onNotify: (data: string) => void;
}
