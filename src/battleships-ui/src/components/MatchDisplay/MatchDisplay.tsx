import { useEffect } from 'react';
import { generatePath, useNavigate } from 'react-router-dom';
import { Ammo } from '../../models/Ammo';
import { Match } from '../../models/Match';
import { MapTile } from '../../models/MatchMap';
import { GameMode } from '../../models/MatchSettings';
import MatchProvider from '../../services/MatchProvider/MatchProvider';
import AmmoRack from './AmmoRack/AmmoRack';
import MapGrid from './MapGrid/MapGrid';

export default function MatchDisplay() {
  const navigate = useNavigate();

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
  });

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
                  {match.settings.gameMode == GameMode.Ammo ? 10 : 1}{' '}
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
                  {match.settings.gameMode == GameMode.Ammo ? 10 : 1}{' '}
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
    console.log(`attacking ${tile.x}-${tile.y} with ${turn.ammo.name}`);
  }

  function onOwnTileSelect(tile: MapTile): void {
    console.log(`friendly fire on ${tile.x}-${tile.y}`);
  }
}

export function matchLoader(): Match {
  const match = MatchProvider.Instance.match;

  return match;
}
