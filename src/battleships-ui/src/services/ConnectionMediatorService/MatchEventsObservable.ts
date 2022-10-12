export default class MatchEventsObservable {
  constructor(onNotify: (data: string) => void) {
    this.onNotify = onNotify;
  }

  onNotify: (data: string) => void;
}
