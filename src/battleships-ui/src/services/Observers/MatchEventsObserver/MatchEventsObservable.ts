import LoggerService, { PatternTypes } from '../../LoggerService/LoggerService';
import { IObservable } from '../Observer';

export default class MatchEventsObservable implements IObservable {
  private logger = LoggerService.Instance.getLogger(PatternTypes.Observer);

  constructor(onNotify: (data: string) => void) {
    this.onNotify = (data: string) => {
      this.logger.log(`MatchEventsObservable.onNotify()`);
      onNotify(data);
    };
  }

  onNotify: (data: string) => void;
}
