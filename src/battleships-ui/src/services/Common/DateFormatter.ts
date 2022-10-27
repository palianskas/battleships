export class DateFormatter {
  static formatTime(date: Date) {
    return date.getMinutes() + ':' + date.getSeconds() + ':' + date.getMilliseconds();
  }
}
