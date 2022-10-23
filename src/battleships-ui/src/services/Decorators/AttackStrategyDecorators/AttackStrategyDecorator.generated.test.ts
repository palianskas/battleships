import MatchMap, { MapTile } from '../../../models/MatchMap';
import { IAttackStrategy } from '../../Strategies/AttackStrategies/AttackStrategies';
import { AttackStrategyDecorator } from './AttackStrategyDecorator';

jest.mock('../../../models/MatchMap');
jest.mock('../../Strategies/AttackStrategies/AttackStrategies');

describe('AttackStrategyDecorator', () => {
  let instance;

  beforeEach(() => {
    instance = new AttackStrategyDecorator();
  });

  it('instance should be an instanceof AttackStrategyDecorator', () => {
    expect(instance instanceof AttackStrategyDecorator).toBeTruthy();
  });

  it('should have a method attack()', () => {
    // instance.attack(tile,map);
    expect(false).toBeTruthy();
  });
});