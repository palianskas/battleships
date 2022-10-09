import { useEffect } from 'react';
import { generatePath, useNavigate } from 'react-router-dom';
import { Match } from '../../models/Match';
import { GameMode } from '../../models/MatchSettings';
import ConnectionMediatorService, {
  MatchEventNames,
} from '../../services/ConnectionMediatorService/ConnectionMediatorService';
import MatchProvider from '../../services/MatchProvider/MatchProvider';

export default function MatchDisplay() {
  const navigate = useNavigate();

  const match = MatchProvider.Instance.match;
  const bluePlayer = match.players[0];
  const redPlayer = match.players[1];

  useEffect(() => {
    if (match.isPregame) {
      const path = generatePath('pregame');

      navigate(path);
    }
  });

  return (
    <div className="container d-flex justify-content-center">
      <div className="col-3">
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
      <div className="col-6">{match.name}</div>
      <div className="col-3">
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
}

export function matchLoader(): Match {
  const match = MatchProvider.Instance.match;

  return match;
}
