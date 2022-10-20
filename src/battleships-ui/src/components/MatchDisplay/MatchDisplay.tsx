import { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { Ammo, AmmoType } from '../../models/Ammo';
import { Match } from '../../models/Match';
import { MapTile } from '../../models/MatchMap';
import { GameMode } from '../../models/MatchSettings';
import { ModularShipPart } from '../../models/Ships/ShipPart';
import ConnectionMediatorService, {
  MatchEventNames,
} from '../../services/ConnectionMediatorService/ConnectionMediatorService';
import MatchProvider from '../../services/MatchProvider/MatchProvider';
import { ArmorPiercingAttackStrategy } from '../../services/Strategies/AttackStrategies/ArmorPiercingAttackStrategy';
import { IAttackStrategy } from '../../services/Strategies/AttackStrategies/AttackStrategies';
import { ClassicAttackStrategy } from '../../services/Strategies/AttackStrategies/ClassicAttackStrategy';
import { DepthChargeAttackStrategy } from '../../services/Strategies/AttackStrategies/DepthChargeAttackStrategy';
import { HighExplosiveAttackStrategy } from '../../services/Strategies/AttackStrategies/HighExplosiveAttackStrategy';
import { StandardAttackStrategy } from '../../services/Strategies/AttackStrategies/StandardAttackStrategy';
import AmmoRack from './AmmoRack/AmmoRack';
import MapGrid from './MapGrid/MapGrid';

interface AttackTurnEventProps {
  offencePlayerId: number;
  defencePlayerId: number;
  tile: MapTile;
  ammoType: AmmoType;
}

export default function MatchDisplay() {
  const [rerenderToggle, setRerenderToggle] = useState(0);

  const match = MatchProvider.Instance.match;
  const bluePlayer = match.players[0];
  const redPlayer = match.players[1];

  useEffect(() => {
    // commented out while in dev
    // if (match.isPregame) {
    //   console.log('pregame');
    //   const path = generatePath('pregame');
    //   navigate(path);
    // }

    ConnectionMediatorService.Instance.addSingular(
      MatchEventNames.AttackPerformed,
      handleAttackTurnEvent
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
          <MapGrid player={bluePlayer} onTileSelect={onOwnTileSelect}></MapGrid>
          <MapGrid
            player={redPlayer}
            onTileSelect={onAttackTurnTargetTileSelect}
          ></MapGrid>
        </div>
        <AmmoRack onAmmoSelect={onAmmoSelect} />
        <div className="w-100 mt-3 d-flex justify-content-center">
          <Button size="lg" variant="danger" onClick={() => onAttack()}>
            Attack!
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
    bluePlayer.attackTurns[0].ammo = ammo;
  }

  function onAttackTurnTargetTileSelect(tile: MapTile): void {
    const turn = bluePlayer.attackTurns[0];

    turn.tile = tile;
  }

  function onOwnTileSelect(): void {
    const turn = bluePlayer.attackTurns[0];

    turn.tile = undefined!;

    console.log('Cannot attack own ships!');
  }

  function onAttack(): void {
    const turn = bluePlayer.attackTurns[0];

    if (!turn.tile || !turn.ammo) {
      console.log('Select ammo and sector to attack first!');

      return;
    }

    const offencePlayer = bluePlayer;
    const defencePlayer = redPlayer;

    ConnectionMediatorService.Instance.sendEvent(
      MatchEventNames.AttackPerformed,
      {
        offencePlayerId: offencePlayer.id,
        defencePlayerId: defencePlayer.id,
        tile: turn.tile,
        ammoType: turn.ammo.type,
      }
    );
  }

  function handleAttackTurnEvent(data: any): void {
    const { offencePlayerId, defencePlayerId, tile, ammoType } =
      data as AttackTurnEventProps;

    const offencePlayer = match.players.find(
      (player) => player.id === offencePlayerId
    );
    const defencePlayer = match.players.find(
      (player) => player.id === defencePlayerId
    );

    const turn = offencePlayer!.attackTurns[0];

    const mapTile = defencePlayer!.map.tiles[tile.x][tile.y];

    turn.attackStrategy = getAttackStrategyByAmmo(ammoType);

    turn.attackStrategy.attack(mapTile, defencePlayer!.map);

    setRerenderToggle(Math.random());
  }

  function getAttackStrategyByAmmo(ammoType: AmmoType): IAttackStrategy {
    const ammo = match.availableAmmoTypes.find(
      (ammo) => ammo.type === ammoType
    );

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
}

export function matchLoader(): Match {
  const match = MatchProvider.Instance.match;

  return match;
}
