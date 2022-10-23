import { ShipClass } from '../../../../models/Ships/ShipClass';
import { ModularShipPart, ShipPart } from '../../../../models/Ships/ShipPart';
import ShipPartFactory from './ShipPartFactory';
import  from './ShipPartFactory.test';

jest.mock('../../../../models/Ships/ShipClass');
jest.mock('../../../../models/Ships/ShipPart');
jest.mock('./ShipPartFactory');