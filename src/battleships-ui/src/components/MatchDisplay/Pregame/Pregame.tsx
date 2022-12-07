import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/esm/Button';
import { useLoaderData, useNavigate } from 'react-router-dom';
import { Match } from '../../../models/Match';
import MatchSettings from '../../../models/MatchSettings';
import { Player, PlayerTeam } from '../../../models/Player';
import { AttackTurn } from '../../../models/Turns/AttackTurn';
import ConnectionMediatorService, {
  MatchEventNames,
} from '../../../services/ConnectionMediatorService/ConnectionMediatorService';
import { MatchService } from '../../../services/MatchService/MatchService';
import { PlayerService } from '../../../services/PlayerService/PlayerService';
import MatchSettingsConfig from '../MatchSettings/MatchSettings';

interface FirstTurnClaimProps {
  playerId: number;
  claimStrength: number;
}

export default function Pregame() {
  const navigate = useNavigate();

  const match = useLoaderData() as Match;

  let firstTurnClaimStrength: number;

  const [_, setRerenderToggle] = useState(0);
  const [readyPlayerIds, setReadyPlayerIds] = useState([] as number[]);

  useEffect(() => {
    ConnectionMediatorService.Instance.addSingular(
      MatchEventNames.PlayerJoined,
      handlePlayerJoinedEvent
    );
    ConnectionMediatorService.Instance.addSingular(
      MatchEventNames.SecondPlayerJoinedConfirmation,
      handlePlayerJoinedEvent
    );
    ConnectionMediatorService.Instance.addSingular(
      MatchEventNames.PlayerUpdatedMatchSettings,
      handleMatchSettingsChangedEvent
    );
    ConnectionMediatorService.Instance.addSingular(
      MatchEventNames.PlayerLockedInSettings,
      handlePlayerLockedInSettingsEvent
    );
    ConnectionMediatorService.Instance.addSingular(
      MatchEventNames.PlayerFirstTurnClaim,
      handleFirstTurnClaimEvent
    );

    firstTurnClaimStrength = Math.random();
  }, []);

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
      MatchEventNames.PlayerLockedInSettings,
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
        MatchEventNames.SecondPlayerJoinedConfirmation,
        { player: currentPlayer }
      );
    }

    setRerenderToggle(Math.random());
  }

  function handleAddCurrentPlayer(player: Player) {
    match.players.push(player);

    PlayerService.saveToSessionStorage(player);
  }

  function handleMatchSettingsChangedEvent(data: any): void {
    data = data as { matchSettings: MatchSettings };

    match.settings = data.matchSettings;

    setRerenderToggle(Math.random());
  }

  function handlePlayerLockedInSettingsEvent(data: any): void {
    const player = (data as { player: Player }).player;

    if (!readyPlayerIds.some((id) => id === player.id)) {
      readyPlayerIds.push(player.id);
      setReadyPlayerIds([...readyPlayerIds]);

      // check if length > 0 because value will change only after re-rendering
      if (readyPlayerIds.length > 1 && match.isPregame) {
        match.isPregame = false;

        MatchService.initMatchPlayerVehicles();
        MatchService.initMatchAvailableAmmo();

        ConnectionMediatorService.Instance.sendEvent(
          MatchEventNames.MatchStarted
        );

        submitFirstTurnClaim();
      }
    }
  }

  function handleFirstTurnClaimEvent(eventData: any): void {
    const data = eventData as FirstTurnClaimProps;

    const currentPlayer = match.players.find(
      (player) => player.team == PlayerTeam.Blue
    )!;
    const enemyPlayer = match.players.find(
      (player) => player.team == PlayerTeam.Red
    )!;

    if (data.playerId != currentPlayer.id) {
      if (data.claimStrength > firstTurnClaimStrength) {
        enemyPlayer.attackTurns.push(new AttackTurn());
      } else {
        currentPlayer.attackTurns.push(new AttackTurn());
      }

      beginMatch();
    }
  }

  function submitFirstTurnClaim(): void {
    const currentPlayer = PlayerService.getFromSessionStorage()!;

    const data = {
      playerId: currentPlayer?.id,
      claimStrength: firstTurnClaimStrength,
    } as FirstTurnClaimProps;

    ConnectionMediatorService.Instance.sendEvent(
      MatchEventNames.PlayerFirstTurnClaim,
      data
    );
  }

  function beginMatch(): void {
    navigate('/match');
  }
}
