import MatchMap, { MapTile } from '../../../models/MatchMap';
import { ShipClass } from '../../../models/Ships/ShipClass';
import { AttackStrategyDecorator } from '../../Decorators/AttackStrategyDecorators/AttackStrategyDecorator';
import {
  DefaultAttackStrategy,
  CooldownAttackStrategy,
  DamageAttackStrategy,
  ShipSpecificAttackStrategy,
} from './AttackStrategies';
import { ArmorPiercingAttackStrategy } from './ArmorPiercingAttackStrategy';

jest.mock('../../../models/MatchMap');
jest.mock('../../../models/Ships/ShipClass');
jest.mock('../../Decorators/AttackStrategyDecorators/AttackStrategyDecorator');
jest.mock('./AttackStrategies');

describe('ArmorPiercingAttackStrategy', () => {
  let instance;

  beforeEach(() => {
    instance = new ArmorPiercingAttackStrategy();
  });

  it('instance should be an instanceof ArmorPiercingAttackStrategy', () => {
    expect(instance instanceof ArmorPiercingAttackStrategy).toBeTruthy();
  });

  it('should have a method attack()', () => {
    // instance.attack(tile,map);
    expect(false).toBeTruthy();
  });
});