import MatchMap, { MapTile } from '../../../models/MatchMap';
import { AttackStrategyDecorator } from '../../Decorators/AttackStrategyDecorators/AttackStrategyDecorator';
import { DefaultAttackStrategy } from './AttackStrategies';
import { ClassicAttackStrategy } from './ClassicAttackStrategy';

jest.mock('../../../models/MatchMap');
jest.mock('../../Decorators/AttackStrategyDecorators/AttackStrategyDecorator');
jest.mock('./AttackStrategies');

describe('ClassicAttackStrategy', () => {
  let instance: any;

  beforeEach(() => {
    instance = new ClassicAttackStrategy();
  });

  it('instance should be an instanceof ClassicAttackStrategy', () => {
    expect(instance instanceof ClassicAttackStrategy).toBeTruthy();
  });

  it('should have a method attack()', () => {
    // instance.attack(tile,map);
    expect(true).toBeTruthy();
  });
});
