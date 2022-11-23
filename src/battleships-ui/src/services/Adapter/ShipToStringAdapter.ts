import Ship from '../../models/Ships/Ship';
import LoggerService, { PatternTypes } from '../LoggerService/LoggerService';

export class ShipToStringAdapter extends Ship {
  public ship: Ship;
  shipToString: string;
  constructor(ship: Ship) {
    super();
    this.ship = ship;
    this.shipToString = JSON.stringify(ship);
  }
  create() {
    var logger = LoggerService.Instance.getLogger(PatternTypes.Adapter);
    logger.log(`Ship to string: `, this.shipToString);
  }
}
