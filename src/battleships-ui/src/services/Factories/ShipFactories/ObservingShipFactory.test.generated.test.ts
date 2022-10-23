import {
  ObservingBattleship,
  ObservingCarrier,
  ObservingCruiser,
  ObservingSpeedboat,
  ObservingSubmarine,
  IObservingShip,
} from '../../../models/Ships/ObservingShips';
import { ShipClass } from '../../../models/Ships/ShipClass';
import { IShipFactory } from './ShipFactory';
import ObservingShipFactory from './ObservingShipFactory';
import  from './ObservingShipFactory.test';

jest.mock('../../../models/Ships/ObservingShips');
jest.mock('../../../models/Ships/ShipClass');
jest.mock('./ShipFactory');
jest.mock('./ObservingShipFactory');