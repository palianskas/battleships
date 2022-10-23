import {
    ModularBattleship,
    ModularCarrier,
    ModularCruiser,
    ModularSpeedboat,
    ModularSubmarine,
    IModularShip,
} from '../../../models/Ships/ModularShips';
import { ShipClass } from '../../../models/Ships/ShipClass';
import { IShipFactory } from './ShipFactory';
import ModularShipFactory from './ModularShipFactory';
import  from './ModularShipFactory.test';

jest.mock('../../../models/Ships/ModularShips');
jest.mock('../../../models/Ships/ShipClass');
jest.mock('./ShipFactory');
jest.mock('./ModularShipFactory');