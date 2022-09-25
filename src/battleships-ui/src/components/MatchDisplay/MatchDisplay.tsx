import { LoaderFunctionArgs, useLoaderData } from 'react-router-dom';
import { Match } from '../../models/Match';
import { MatchService } from '../../services/MatchService/MatchService';

export default function MatchDisplay() {
  const match = useLoaderData() as Match;

  return (
    <div className="container d-flex justify-content-center">
      {match.id} - {match.name}
    </div>
  );
}

export async function matchLoader({
  params,
}: LoaderFunctionArgs): Promise<Match> {
  const id = Number.parseInt(params.id ?? '');

  const match = await MatchService.get(id);

  return match;
}
