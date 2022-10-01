import Vehicle from '../Vehicle';

export enum AirshipClass {
  Plane,
  Drone,
}

export abstract class Airship extends Vehicle {
  readonly travelRadius!: number;
  readonly type!: AirshipClass;
}

export class Plane extends Airship {
  readonly travelRadius = 7;
  readonly type = AirshipClass.Plane;
}

export class Drone extends Airship {
  readonly travelRadius = 4;
  readonly type = AirshipClass.Drone;
}
