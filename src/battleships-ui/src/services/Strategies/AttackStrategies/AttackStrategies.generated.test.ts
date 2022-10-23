import MatchMap, { MapTile } from '../../../models/MatchMap';
import { ShipClass } from '../../../models/Ships/ShipClass';
import { ModularShipPart } from '../../../models/Ships/ShipPart';
import { AttackStrategyDecorator } from '../../Decorators/AttackStrategyDecorators/AttackStrategyDecorator';
import MatchProvider from '../../MatchProvider/MatchProvider';
import { ShipSpecificAttackStrategy } from './AttackStrategies';

jest.mock('../../../models/MatchMap');
jest.mock('../../../models/Ships/ShipClass');
jest.mock('../../../models/Ships/ShipPart');
jest.mock('../../Decorators/AttackStrategyDecorators/AttackStrategyDecorator');
jest.mock('../../MatchProvider/MatchProvider');

describe('ShipSpecificAttackStrategy', () => {
  let instance;

  beforeEach(() => {
    instance = new ShipSpecificAttackStrategy();
  });

  it('instance should be an instanceof ShipSpecificAttackStrategy', () => {
    expect(instance instanceof ShipSpecificAttackStrategy).toBeTruthy();
  });

  it('should have a method attack()', () => {
    // instance.attack(tile,map);
    expect(false).toBeTruthy();
  });
});