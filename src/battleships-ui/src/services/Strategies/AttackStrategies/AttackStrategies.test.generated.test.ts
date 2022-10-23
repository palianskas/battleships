import MatchMap from '../../../models/MatchMap';
import { ShipClass } from '../../../models/Ships/ShipClass';
import { ModularShipPart, ShipPart } from '../../../models/Ships/ShipPart';
import {
  AreaAttackStrategy,
  DamageAttackStrategy,
  DefaultAttackStrategy,
  ShipSpecificAttackStrategy,
} from './AttackStrategies';
import  from './AttackStrategies.test';

jest.mock('../../../models/MatchMap');
jest.mock('../../../models/Ships/ShipClass');
jest.mock('../../../models/Ships/ShipPart');
jest.mock('./AttackStrategies');