import { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { Airship, AirshipClass } from '../../models/Airships/Airship';
import { Ammo, AmmoType } from '../../models/Ammo';
import { Match } from '../../models/Match';
import { MapTile } from '../../models/MatchMap';
import { GameMode } from '../../models/MatchSettings';
import { PlayerTeam } from '../../models/Player';
import { ShipClass } from '../../models/Ships/ShipClass';
import { ModularShipPart } from '../../models/Ships/ShipPart';
import { ShipToStringAdapter } from '../../services/Adapter/ShipToStringAdapter';
import ConnectionMediatorService, {
  MatchEventNames,
} from '../../services/ConnectionMediatorService/ConnectionMediatorService';
import AirshipFactory from '../../services/Factories/AirshipFactories/AirshipFactory';
import ObservingShipFactory from '../../services/Factories/ShipFactories/ObservingShipFactory';
import LoggerService, {
  PatternTypes,
} from '../../services/LoggerService/LoggerService';
import MatchProvider from '../../services/MatchProvider/MatchProvider';
import { ArmorPiercingAttackStrategy } from '../../services/Strategies/AttackStrategies/ArmorPiercingAttackStrategy';
import { IAttackStrategy } from '../../services/Strategies/AttackStrategies/AttackStrategies';
import { ClassicAttackStrategy } from '../../services/Strategies/AttackStrategies/ClassicAttackStrategy';
import { DepthChargeAttackStrategy } from '../../services/Strategies/AttackStrategies/DepthChargeAttackStrategy';
import { HighExplosiveAttackStrategy } from '../../services/Strategies/AttackStrategies/HighExplosiveAttackStrategy';
import { StandardAttackStrategy } from '../../services/Strategies/AttackStrategies/StandardAttackStrategy';
import { AttackTurnHandler } from '../../services/TurnHandler/TurnHandler';
import AmmoRack from './AmmoRack/AmmoRack';
import MapGrid from './MapGrid/MapGrid';

export default function MatchDisplay() {
  const [rerenderToggle, setRerenderToggle] = useState(0);
  const [selectedTile, setSelectedTile] = useState<MapTile | null>(null);

  const match = MatchProvider.Instance.match;
  const bluePlayerIdx = match.players[0].team === PlayerTeam.Blue ? 0 : 1;
  const redPlayerIdx = Math.abs(bluePlayerIdx - 1);
  const bluePlayer = match.players[bluePlayerIdx];
  const redPlayer = match.players[redPlayerIdx];

  useEffect(() => {
    // commented out while in dev
    // if (match.isPregame) {
    //   console.log('pregame');
    //   const path = generatePath('pregame');
    //   navigate(path);
    // }

    const attackTurnHandler = new AttackTurnHandler(
      getAttackStrategyByAmmo,
      [(_) => rerender()],
      [(_) => true]
    );

    ConnectionMediatorService.Instance.addSingular(
      MatchEventNames.AttackPerformed,
      attackTurnHandler.perform
    );
  }, []);

  return (
    <div className="container d-flex justify-content-center">
      <div className="col-2">
        <div>
          {bluePlayer?.name} {bluePlayer?.id} {bluePlayer?.team}
        </div>
        <div>
          {bluePlayer?.ships.map((ship, indexShip) => (
            <div key={indexShip}>
              <span>{ship.constructor.name}</span>
              <br />
              {ship.parts.map((part, indexPart) => (
                <span key={`${indexShip}-${indexPart}`}>
                  {match.settings.gameMode === GameMode.Ammo
                    ? (part as ModularShipPart).hp
                    : 1}{' '}
                </span>
              ))}
              <br />
            </div>
          ))}
        </div>
      </div>
      <div className="col-8">
        <div className="w-100 d-flex justify-content-center">{match.name}</div>
        <div className="w-100 d-flex justify-content-center">
          <MapGrid
            player={bluePlayer}
            selectedTile={selectedTile}
            onTileSelect={onOwnTileSelect}
          />
          <MapGrid
            player={redPlayer}
            selectedTile={selectedTile}
            onTileSelect={onAttackTurnTargetTileSelect}
          />
        </div>
        <AmmoRack onAmmoSelect={onAmmoSelect} />
        <div className="w-100 mt-3 d-flex justify-content-center">
          <Button
            size="lg"
            disabled={!selectedTile || bluePlayer.attackTurns.length < 1}
            variant="danger"
            onClick={() => onAttack()}
          >
            Attack!
          </Button>
        </div>
        <div className="w-100 mt-3 d-flex justify-content-center">
          <Button
            size="lg"
            disabled={!selectedTile}
            variant="danger"
            onClick={() => onAddAirship(AirshipClass.Plane)}
          >
            Add Plane!
          </Button>
        </div>
        <div className="w-100 mt-3 d-flex justify-content-center">
          <Button
            size="lg"
            disabled={!selectedTile}
            variant="danger"
            onClick={() => onAddAirship(AirshipClass.Drone)}
          >
            Add Drone!
          </Button>
        </div>
      </div>
      <div className="col-2">
        <div>
          {redPlayer?.name} {redPlayer?.id} {redPlayer?.team}
        </div>
        <div>
          {redPlayer?.ships.map((ship, indexShip) => (
            <div key={indexShip}>
              <span>{ship.constructor.name}</span>
              <br />
              {ship.parts.map((part, indexPart) => (
                <span key={`${indexShip}-${indexPart}`}>
                  {match.settings.gameMode === GameMode.Ammo ? 10 : 1}{' '}
                </span>
              ))}
              <br />
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  function onAmmoSelect(ammo: Ammo): void {
    if (bluePlayer.attackTurns.length < 1) {
      console.error('No attack turns left!');
      return;
    }

    bluePlayer.attackTurns[0].ammo = ammo;
  }

  function onAttackTurnTargetTileSelect(tile: MapTile): void {
    if (bluePlayer.attackTurns.length < 1) {
      console.error('No attack turns left!');
      return;
    }

    const turn = bluePlayer.attackTurns[0];
    setSelectedTile(tile);

    turn.tile = tile;
  }

  function onOwnTileSelect(): void {
    const turn = bluePlayer.attackTurns[0];
    setSelectedTile(null);
    turn.tile = undefined!;
    console.error('Cannot attack own ships!');
  }

  function onAttack(): void {
    const turn = bluePlayer.attackTurns[0];

    if (!turn.tile || !turn.ammo) {
      console.error('Select ammo and sector to attack first!');

      return;
    }

    ConnectionMediatorService.Instance.sendEvent(
      MatchEventNames.AttackPerformed,
      {
        offencePlayerId: bluePlayer.id,
        defencePlayerId: redPlayer.id,
        tile: turn.tile,
        ammoType: turn.ammo.type,
      }
    );
    setSelectedTile(null);

    const adapter = new ShipToStringAdapter(bluePlayer.ships[0]);
    adapter.create();
  }

  function getAttackStrategyByAmmo(ammoType: AmmoType): IAttackStrategy {
    const ammo = match.availableAmmoTypes.find(
      (ammo) => ammo.type === ammoType
    );

    if (!ammo) {
      console.error(
        `Unable to resolve attack strategy by type ${ammoType}. Available types are: ${JSON.stringify(
          match.availableAmmoTypes
        )}`
      );
    }

    switch (ammoType) {
      case AmmoType.Classic:
        return new ClassicAttackStrategy();
      case AmmoType.Standard:
        return new StandardAttackStrategy(ammo!.damage);
      case AmmoType.ArmorPiercing:
        return new ArmorPiercingAttackStrategy(ammo!.cooldown, ammo!.damage);
      case AmmoType.HighExplosive:
        return new HighExplosiveAttackStrategy(
          ammo!.damage,
          ammo!.impactRadius
        );
      case AmmoType.DepthCharge:
        return new DepthChargeAttackStrategy(ammo!.damage, ammo!.impactRadius);
    }
  }

  function onAddAirship(type: AirshipClass) {
    const carrier =
      bluePlayer.ships.find((s) => s.shipClass == ShipClass.Carrier) ??
      ObservingShipFactory.Instance.create(ShipClass.Carrier);
    let foundAirship: Airship | undefined;
    if (type == AirshipClass.Plane) {
      foundAirship = bluePlayer.airships.find(
        (a) => a.type == AirshipClass.Plane
      );
    }
    if (type == AirshipClass.Drone) {
      foundAirship = bluePlayer.airships.find(
        (a) => a.type == AirshipClass.Drone
      );
    }
    if (!foundAirship) {
      const factory = new AirshipFactory();
      bluePlayer.airships = [
        ...bluePlayer.airships,
        factory.create(carrier, type),
      ];
    } else {
      bluePlayer.airships = [...bluePlayer.airships, foundAirship.clone()];
      var logger = LoggerService.Instance.getLogger(PatternTypes.Prototype);
      logger.log(
        'cloned from : ',
        foundAirship,
        'clone:  ',
        foundAirship.clone(),
        'is same object?',
        Object.is(foundAirship, foundAirship.clone())
      );
    }
  }

  function rerender(): void {
    setRerenderToggle(Math.random() * 100);
  }
}

export function matchLoader(): Match {
  const match = MatchProvider.Instance.match;

  return match;
}
