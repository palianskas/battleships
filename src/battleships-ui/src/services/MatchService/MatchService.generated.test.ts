import axios from 'axios';
import { Match } from '../../models/Match';
import MatchMap from '../../models/MatchMap';
import { GameMode } from '../../models/MatchSettings';
import Ship from '../../models/Ships/Ship';
import { ShipClass } from '../../models/Ships/ShipClass';
import { AmmoConstructor } from '../Builders/AmmoBuilder/AmmoConstructor';
import ClassicShipFactory from '../Factories/ShipFactories/ClassicShipFactory';
import ModularShipFactory from '../Factories/ShipFactories/ModularShipFactory';
import ObservingShipFactory from '../Factories/ShipFactories/ObservingShipFactory';
import { IShipFactory } from '../Factories/ShipFactories/ShipFactory';
import MatchProvider from '../MatchProvider/MatchProvider';
import { MatchService } from './MatchService';

jest.mock('axios');
jest.mock('../../models/Match');
jest.mock('../../models/MatchMap');
jest.mock('../../models/MatchSettings');
jest.mock('../../models/Ships/Ship');
jest.mock('../../models/Ships/ShipClass');
jest.mock('../Builders/AmmoBuilder/AmmoConstructor');
jest.mock('../Factories/ShipFactories/ClassicShipFactory');
jest.mock('../Factories/ShipFactories/ModularShipFactory');
jest.mock('../Factories/ShipFactories/ObservingShipFactory');
jest.mock('../Factories/ShipFactories/ShipFactory');
jest.mock('../MatchProvider/MatchProvider');

describe('MatchService', () => {
  let instance;

  beforeEach(() => {
    instance = new MatchService();
  });

  it('instance should be an instanceof MatchService', () => {
    expect(instance instanceof MatchService).toBeTruthy();
  });

  it('should have a static method initMatchPlayerVehicles()', () => {
    // MatchService.initMatchPlayerVehicles();
    expect(false).toBeTruthy();
  });

  it('should have a static method initMatchAvailableAmmo()', () => {
    // MatchService.initMatchAvailableAmmo();
    expect(false).toBeTruthy();
  });

  it('should have a static method getShipFactoryByGameType()', () => {
    // MatchService.getShipFactoryByGameType(match);
    expect(false).toBeTruthy();
  });

  it('should have a static method initPlayerShipsPlacement()', () => {
    // MatchService.initPlayerShipsPlacement(map,ships);
    expect(false).toBeTruthy();
  });

  it('should have a static method getShipSet()', () => {
    // MatchService.getShipSet(factory);
    expect(false).toBeTruthy();
  });
});