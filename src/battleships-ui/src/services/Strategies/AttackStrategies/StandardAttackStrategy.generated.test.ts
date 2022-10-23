import MatchMap, { MapTile } from '../../../models/MatchMap';
import { ShipClass } from '../../../models/Ships/ShipClass';
import { AttackStrategyDecorator } from '../../Decorators/AttackStrategyDecorators/AttackStrategyDecorator';
import {
  DefaultAttackStrategy,
  DamageAttackStrategy,
  ShipSpecificAttackStrategy,
} from './AttackStrategies';
import { StandardAttackStrategy } from './StandardAttackStrategy';

jest.mock('../../../models/MatchMap');
jest.mock('../../../models/Ships/ShipClass');
jest.mock('../../Decorators/AttackStrategyDecorators/AttackStrategyDecorator');
jest.mock('./AttackStrategies');

describe('StandardAttackStrategy', () => {
  let instance: any;

  beforeEach(() => {
    instance = new StandardAttackStrategy(0);
  });

  it('instance should be an instanceof StandardAttackStrategy', () => {
    expect(instance instanceof StandardAttackStrategy).toBeTruthy();
  });

  it('should have a method attack()', () => {
    // instance.attack(tile,map);
    expect(true).toBeTruthy();
  });
});
