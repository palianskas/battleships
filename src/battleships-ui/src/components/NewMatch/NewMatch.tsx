import Button from 'react-bootstrap/esm/Button';
import { LinkContainer } from 'react-router-bootstrap';
import { generatePath, useNavigate } from 'react-router-dom';
import { MatchService } from '../../services/MatchService/MatchService';
import { PlayerService } from '../../services/PlayerService.ts/PlayerService';

export default function NewMatch() {
  const navigate = useNavigate();

  const handleClick = async () => {
    await MatchService.createNew();
    await PlayerService.createNew('New player');

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
