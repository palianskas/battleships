import { useEffect } from 'react';
import {
  generatePath,
  LoaderFunctionArgs,
  Outlet,
  useLoaderData,
  useNavigate,
} from 'react-router-dom';
import { Match } from '../../models/Match';
import { MatchService } from '../../services/MatchService/MatchService';

export default function MatchDisplay() {
  const navigate = useNavigate();

  const match = useLoaderData() as Match;

  useEffect(() => {
    if (match.isPregame) {
      const path = generatePath('pregame');

      navigate(path);
    }
  }, []);

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

export async function matchLoader({
  params,
}: LoaderFunctionArgs): Promise<Match> {
  const id = Number.parseInt(params.id ?? '');

  const match = await MatchService.get();

  return match;
}
