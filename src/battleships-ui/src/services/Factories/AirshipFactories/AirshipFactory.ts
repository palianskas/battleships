import {
  Airship,
  AirshipClass,
  Drone,
  Plane,
} from '../../../models/Airships/Airship';

export interface IAirshipFactory {
  create(type: AirshipClass): Airship;
}

export default class AirshipFactory implements IAirshipFactory {
  create(type: AirshipClass): Airship {
    switch (type) {
      case AirshipClass.Drone: {
        return new Drone();
      }
      case AirshipClass.Plane: {
        return new Plane();
      }
    }
  }
}
