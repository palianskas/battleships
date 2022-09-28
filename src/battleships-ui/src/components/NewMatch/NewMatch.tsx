import Button from 'react-bootstrap/esm/Button';
import { LinkContainer } from 'react-router-bootstrap';
import { generatePath, useNavigate } from 'react-router-dom';
import { MatchService } from '../../services/MatchService/MatchService';

export default function NewMatch() {
  const navigate = useNavigate();

  const handleClick = async () => {
    const match = await MatchService.createNew();

    const path = generatePath('match');

    navigate(path);
  };

  return (
    <div className="container d-flex justify-content-center">
      <LinkContainer to={'matches'}>
        <Button className="primary" onClick={handleClick}>
          Create a new match!
        </Button>
      </LinkContainer>
    </div>
  );
}
