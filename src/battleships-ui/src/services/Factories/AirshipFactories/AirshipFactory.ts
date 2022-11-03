import {
    Airship,
    AirshipClass,
    Drone,
    Plane,
} from '../../../models/Airships/Airship';
import Ship from '../../../models/Ships/Ship';

export interface IAirshipFactory {
    create(ship: Ship, type: AirshipClass): Airship;
}

export default class AirshipFactory implements IAirshipFactory {
    create(ship: Ship, type: AirshipClass): Airship {
        var drone = new Drone(ship);
        switch (type) {
            case AirshipClass.Drone: {
                return new Drone(ship);
            }
            case AirshipClass.Plane: {
                return new Plane(ship);
            }
        }
    }
}
