import Ship from '../../../models/Ships/Ship';
import { ShipClass } from '../../../models/Ships/ShipClass';

export interface IShipFactory {
  create(type: ShipClass): Ship;
}
