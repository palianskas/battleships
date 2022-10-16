import { IAttackStrategy } from '../../services/Strategies/AttackStrategies/AttackStrategies';
import { Ammo } from '../Ammo';
import { MapTile } from '../MatchMap';

export class AttackTurn {
  ammo!: Ammo;
  tile!: MapTile;
  attackStrategy!: IAttackStrategy;
}
