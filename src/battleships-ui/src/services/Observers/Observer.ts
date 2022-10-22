export interface ISubject {
  notify(event: any, data: any): void;
  add(event: any, action: Function): void;
  addSingular(event: any, action: Function): void;
}

export interface IObservable {
  onNotify(data: string): void;
}
