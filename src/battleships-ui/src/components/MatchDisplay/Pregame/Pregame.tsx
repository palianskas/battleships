import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/esm/Button';
import { useLoaderData, useNavigate } from 'react-router-dom';
import { Match } from '../../../models/Match';
import MatchSettings from '../../../models/MatchSettings';
import { Player } from '../../../models/Player';
import ConnectionMediatorService, {
  MatchEventNames,
} from '../../../services/ConnectionMediatorService/ConnectionMediatorService';
import { MatchService } from '../../../services/MatchService/MatchService';
import { PlayerService } from '../../../services/PlayerService.ts/PlayerService';
import MatchSettingsConfig from '../MatchSettings/MatchSettings';

export default function Pregame() {
  const navigate = useNavigate();

  const match = useLoaderData() as Match;

  const [rerenderToggle, setRerenderToggle] = useState(false);
  const [readyPlayerIds, setReadyPlayerIds] = useState([] as number[]);

  useEffect(() => {
    ConnectionMediatorService.Instance.add(
      MatchEventNames.PlayerJoined,
      handlePlayerJoinedEvent
    );
    ConnectionMediatorService.Instance.add(
      MatchEventNames.SecondPlayerConfirmation,
      handlePlayerJoinedEvent
    );
    ConnectionMediatorService.Instance.add(
      MatchEventNames.PlayerUpdatedMatchSettings,
      handleMatchSettingsChangedEvent
    );
    ConnectionMediatorService.Instance.add(
      MatchEventNames.PlayerStartedMatch,
      handlePlayerStartedMatchEvent
    );
  });

  return (
    <div className="container">
      <div className="container mb-5">
        <h1>{match.name}</h1>
        <h2>
          {match.players?.length < 2
            ? 'Waiting for the other player...'
            : 'Waiting for both players to start the match...'}
        </h2>
      </div>

      {match.players.length === 2 && (
        <div>
          <div className="mb-5">
            <MatchSettingsConfig
              matchSettings={match.settings}
            ></MatchSettingsConfig>
          </div>
          <div className="mb-5">
            <Button
              className="primary"
              onClick={() => onStartMatchButtonClick()}
            >
              Start the match!
            </Button>
          </div>
        </div>
      )}
    </div>
  );

  function onStartMatchButtonClick(): void {
    const currentPlayer = PlayerService.getFromSessionStorage();

    ConnectionMediatorService.Instance.sendEvent(
      MatchEventNames.PlayerStartedMatch,
      { player: currentPlayer }
    );
  }

  function handlePlayerJoinedEvent(data: any): void {
    const player = new Player(data.player);

    const currentPlayer = PlayerService.getFromSessionStorage();

    if (
      match.players.length < 2 &&
      !match.players.some((matchPlayer) => matchPlayer.id == player.id)
    ) {
      if (player.id === currentPlayer?.id) {
        handleAddCurrentPlayer(player);
      } else {
        handleAddEnemyPlayer(player, currentPlayer);
      }
    }
  }

  function handleAddEnemyPlayer(enemyPlayer: Player, currentPlayer?: Player) {
    enemyPlayer.invertTeam();

    match.players.push(enemyPlayer);

    if (currentPlayer != null) {
      ConnectionMediatorService.Instance.sendEvent(
        MatchEventNames.SecondPlayerConfirmation,
        { player: currentPlayer }
      );
    }

    setRerenderToggle(!rerenderToggle);
  }

  function handleAddCurrentPlayer(player: Player) {
    match.players.push(player);

    PlayerService.saveToSessionStorage(player);
  }

  function handleMatchSettingsChangedEvent(data: any): void {
    data = data as { matchSettings: MatchSettings };

    match.settings = data.matchSettings;

    setRerenderToggle(!rerenderToggle);
  }

  function handlePlayerStartedMatchEvent(data: any): void {
    const player = (data as { player: Player }).player;

    if (!readyPlayerIds.some((id) => id === player.id)) {
      setReadyPlayerIds([...readyPlayerIds, player.id]);

      // check if length > 0 because value will change only after re-rendering
      if (readyPlayerIds.length > 0 && match.isPregame) {
        match.isPregame = false;

        MatchService.initMatchPlayerVehicles();
        MatchService.initMatchAvailableAmmo();

        navigate('/match');
      }
    }
  }
}
