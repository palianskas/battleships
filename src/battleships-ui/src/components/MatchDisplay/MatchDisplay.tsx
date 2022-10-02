import { useEffect } from 'react';
import { generatePath, useLoaderData, useNavigate } from 'react-router-dom';
import { Match } from '../../models/Match';
import MatchProvider from '../../services/MatchProvider/MatchProvider';

export default function MatchDisplay() {
  const navigate = useNavigate();

  const match = useLoaderData() as Match;

  useEffect(() => {
    if (match.isPregame) {
      const path = generatePath('pregame');

      navigate(path);
    }
  }, [match.isPregame]);

  return (
    <div className="container d-flex justify-content-center">
      <span>Name: {match.name}</span>
      <br />
      {match.players.map((player) => (
        <span>{player.name}</span>
      ))}
    </div>
  );
}

export async function matchLoader(): Promise<Match> {
  return MatchProvider.Instance.match;
}
