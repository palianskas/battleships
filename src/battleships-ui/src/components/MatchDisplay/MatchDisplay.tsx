import { useEffect, useState } from 'react';
import { generatePath, useLoaderData, useNavigate } from 'react-router-dom';
import { Match } from '../../models/Match';
import { Player } from '../../models/Player';
import MatchEventsService, {
  MatchEventNames,
} from '../../services/MatchEventService/MatchEventService';
import MatchProvider from '../../services/MatchProvider/MatchProvider';
import { MatchService } from '../../services/MatchService/MatchService';
import { PlayerService } from '../../services/PlayerService.ts/PlayerService';

export default function MatchDisplay() {
  const navigate = useNavigate();

  const [rerenderToggle, setRerenderToggle] = useState(false);

  const match = MatchProvider.Instance.match;
  const bluePlayer = match.players[0];
  const redPlayer = match.players[1];

  useEffect(() => {
    MatchEventsService.Instance.add(
      MatchEventNames.PlayerJoined,
      handlePlayerJoinedEvent
    );
    MatchEventsService.Instance.add(
      MatchEventNames.SecondPlayerConfirmation,
      handlePlayerJoinedEvent
    );

    // if (match.isPregame) {
    //   const path = generatePath('pregame');

    //   navigate(path);
    // }
  });

  return (
    <div className="container d-flex justify-content-center">
      <div className="col-3">
        <div>{bluePlayer?.name}</div>
        <div>
          {bluePlayer?.ships.map((ship, index) => (
            <div key={index}>
              <span>{ship.constructor.name}</span>
              <br />
            </div>
          ))}
        </div>
      </div>
      <div className="col-6">{match.name}</div>
      <div className="col-3">
        <div>{redPlayer?.name}</div>
        <div>
          {redPlayer?.ships.map((ship, index) => (
            <div key={index}>
              <span>{ship.constructor.name}</span>
              <br />
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  function handlePlayerJoinedEvent(data: any): void {
    try {
      const player = new Player(data.player);

      const currentPlayer = PlayerService.getFromSessionStorage();

      if (
        (player.id !== currentPlayer?.id &&
          MatchProvider.Instance.match.players.length < 2) ||
        MatchProvider.Instance.match.players.length == 0
      ) {
        player.invertTeam();

        MatchProvider.Instance.match.players.push(player);

        MatchProvider.Instance.match = new Match(MatchProvider.Instance.match);

        if (currentPlayer != null) {
          MatchEventsService.Instance.sendEvent(
            MatchEventNames.SecondPlayerConfirmation,
            { player: currentPlayer }
          );
        }

        if (MatchProvider.Instance.match.players.length == 2) {
          MatchService.initMatchPlayerVehicles();
        }
      }

      setRerenderToggle(!rerenderToggle);
    } catch (e) {
      console.log(e);
    }
  }
}

export function matchLoader(): Match {
  const match = MatchProvider.Instance.match;

  return match;
}
