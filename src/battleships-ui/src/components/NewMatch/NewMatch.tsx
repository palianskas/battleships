import Button from 'react-bootstrap/esm/Button';
import { LinkContainer } from 'react-router-bootstrap';
import { generatePath, useNavigate } from 'react-router-dom';
import MatchEventsService, {
  MatchEventNames,
} from '../../services/MatchEventService/MatchEventService';
import { PlayerService } from '../../services/PlayerService.ts/PlayerService';

export default function NewMatch() {
  const navigate = useNavigate();

  const handleClick = async () => {
    PlayerService.createNew('New player');

    MatchEventsService.Instance.sendEvent(MatchEventNames.PlayerJoined, {
      player: PlayerService.getFromLocalStorage(),
    });

    await MatchEventsService.Instance.sendEvent(MatchEventNames.NewMatch);

    const path = generatePath('match');

    navigate(path);
  };

  return (
    <div className="container d-flex justify-content-center">
      <LinkContainer to={'matches'}>
        <Button className="primary" onClick={handleClick}>
          Join a match!
        </Button>
      </LinkContainer>
    </div>
  );
}
