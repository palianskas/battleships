import { useLoaderData } from 'react-router-dom';
import { Match } from '../../../models/Match';

export default function Pregame() {
  const match = useLoaderData() as Match;

  return (
    <div className="container d-flex justify-content-center">
      <span>Pregame</span>
      <span>
        {match.id} - {match.name}
      </span>
      <br />
      {match.players.map((player) => (
        <span>{player.name}</span>
      ))}
    </div>
  );
}
