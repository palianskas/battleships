import Button from 'react-bootstrap/esm/Button';
import { LinkContainer } from 'react-router-bootstrap';
import { generatePath, useNavigate } from 'react-router-dom';
import ConnectionMediatorService, {
  MatchEventNames,
} from '../../services/ConnectionMediatorService/ConnectionMediatorService';
import { PlayerService } from '../../services/PlayerService.ts/PlayerService';

export default function NewMatch() {
  const navigate = useNavigate();

  const handleClick = async () => {
    const player = PlayerService.createNew('New player');

    ConnectionMediatorService.Instance.sendEvent(MatchEventNames.PlayerJoined, {
      player: player,
    });

    await ConnectionMediatorService.Instance.sendEvent(
      MatchEventNames.NewMatch
    );

    const path = generatePath('match/pregame');

    navigate(path);
  };

  return (
    <div className="container d-flex justify-content-center">
      <LinkContainer to={'match'}>
        <Button className="primary" onClick={handleClick}>
          Join a match!
        </Button>
      </LinkContainer>
    </div>
  );
}
