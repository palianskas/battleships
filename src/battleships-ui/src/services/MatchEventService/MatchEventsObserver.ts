export default class MatchEventsObserver {
  constructor(onNotify: (data: string) => void) {
    this.onNotify = onNotify;
  }

  onNotify: (data: string) => void;
}
