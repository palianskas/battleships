import { useLoaderData } from 'react-router-dom';
import { Match } from '../../../models/Match';
import MatchSettingsConfig from '../MatchSettings/MatchSettings';

export default function Pregame() {
  const match = useLoaderData() as Match;

  console.log(match);

  return (
    <div className="container">
      <div className="container pb-5">
        <h1>
          {match.players?.length < 2
            ? 'Waiting for the other player...'
            : 'Waiting for both players to start the match...'}
        </h1>
      </div>

      <MatchSettingsConfig matchSettings={match.settings}></MatchSettingsConfig>
    </div>
  );
}
