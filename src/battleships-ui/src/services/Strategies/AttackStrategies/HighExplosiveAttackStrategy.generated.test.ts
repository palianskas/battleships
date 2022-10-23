import MatchMap, { MapTile } from '../../../models/MatchMap';
import { ShipClass } from '../../../models/Ships/ShipClass';
import { AttackStrategyDecorator } from '../../Decorators/AttackStrategyDecorators/AttackStrategyDecorator';
import {
  AreaAttackStrategy,
  DefaultAttackStrategy,
  DamageAttackStrategy,
  ShipSpecificAttackStrategy,
} from './AttackStrategies';
import { HighExplosiveAttackStrategy } from './HighExplosiveAttackStrategy';

jest.mock('../../../models/MatchMap');
jest.mock('../../../models/Ships/ShipClass');
jest.mock('../../Decorators/AttackStrategyDecorators/AttackStrategyDecorator');
jest.mock('./AttackStrategies');

describe('HighExplosiveAttackStrategy', () => {
  let instance;

  beforeEach(() => {
    instance = new HighExplosiveAttackStrategy();
  });

  it('instance should be an instanceof HighExplosiveAttackStrategy', () => {
    expect(instance instanceof HighExplosiveAttackStrategy).toBeTruthy();
  });

  it('should have a method attack()', () => {
    // instance.attack(tile,map);
    expect(false).toBeTruthy();
  });
});