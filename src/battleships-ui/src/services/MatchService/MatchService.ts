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

const api = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
});

export class MatchService {
  static initMatchPlayerVehicles(): void {
    const match = MatchProvider.Instance.match;

    const factory = this.getShipFactoryByGameType(match);

    match.players.forEach((player) => {
      player.ships = this.getShipSet(factory);

      this.initPlayerShipsPlacement(player.map, player.ships);
    });
  }

  static initMatchAvailableAmmo(): void {
    const match = MatchProvider.Instance.match;

    const ammoConstructor = new AmmoConstructor();

    if (match.settings.gameMode == GameMode.Ammo) {
      match.availableAmmoTypes.push(ammoConstructor.getStandardAmmo());
      match.availableAmmoTypes.push(ammoConstructor.getArmorPiercingAmmo());
      match.availableAmmoTypes.push(ammoConstructor.getHighExplosiveAmmo());
      match.availableAmmoTypes.push(ammoConstructor.getDepthChargeAmmo());
    } else {
      match.availableAmmoTypes.push(ammoConstructor.getClassicAmmo());
    }
  }

  private static getShipFactoryByGameType(match: Match): IShipFactory {
    switch (match.settings.gameMode) {
      case GameMode.Classic: {
        return ClassicShipFactory.Instance;
      }
      case GameMode.Ammo: {
        return ModularShipFactory.Instance;
      }
      case GameMode.FogOfWar: {
        return ObservingShipFactory.Instance;
      }
    }
  }

  // debug version
  private static initPlayerShipsPlacement(map: MatchMap, ships: Ship[]): void {
    ships.forEach((ship, index) => {
      const rowIndex = index * 2;

      ship.parts.forEach((part, partIndex) => {
        map.tiles[rowIndex][partIndex].shipPart = part;
      });
    });
  }

    private static getShipSet(factory: IShipFactory): Ship[] {
        if (factory instanceof ObservingShipFactory) {
            return [
                factory.create(ShipClass.Carrier),             
            ];
        }
    return [
      factory.create(ShipClass.Carrier),
      factory.create(ShipClass.Battleship),
      factory.create(ShipClass.Cruiser),
      factory.create(ShipClass.Submarine),
      factory.create(ShipClass.Speedboat),
    ];
  }
}
