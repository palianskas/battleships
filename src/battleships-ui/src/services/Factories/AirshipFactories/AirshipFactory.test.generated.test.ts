import { AirshipClass, Drone, Plane } from '../../../models/Airships/Airship';
import AirshipFactory from './AirshipFactory';
import  from './AirshipFactory.test';

jest.mock('../../../models/Airships/Airship');
jest.mock('./AirshipFactory');