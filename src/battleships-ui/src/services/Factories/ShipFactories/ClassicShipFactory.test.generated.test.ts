import {
  ClassicBattleship,
  ClassicCarrier,
  ClassicCruiser,
  ClassicSpeedboat,
  ClassicSubmarine,
  IClassicShip,
} from '../../../models/Ships/ClassicShips';
import { ShipClass } from '../../../models/Ships/ShipClass';
import ClassicShipFactory from './ClassicShipFactory';
import  from './ClassicShipFactory.test';

jest.mock('../../../models/Ships/ClassicShips');
jest.mock('../../../models/Ships/ShipClass');
jest.mock('./ClassicShipFactory');