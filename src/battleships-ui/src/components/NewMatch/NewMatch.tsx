import Button from 'react-bootstrap/esm/Button';
import { LinkContainer } from 'react-router-bootstrap';
import { generatePath, useNavigate } from 'react-router-dom';
import MatchEventsService, {
  MatchEventNames,
} from '../../services/MatchEventService/MatchEventService';
import MatchProvider from '../../services/MatchProvider/MatchProvider';
import { PlayerService } from '../../services/PlayerService.ts/PlayerService';

export default function NewMatch() {
  const navigate = useNavigate();

  const handleClick = async () => {
    const player = PlayerService.createNew('New player');

    // MatchProvider.Instance.match.players.push(player);

    MatchEventsService.Instance.sendEvent(MatchEventNames.PlayerJoined, {
      player: player,
    });

    await MatchEventsService.Instance.sendEvent(MatchEventNames.NewMatch);

    const path = generatePath('match');

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
