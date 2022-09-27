import Dropdown from 'react-bootstrap/esm/Dropdown';
import MatchSettings, { GameMode } from '../../../models/MatchSettings';

interface MatchSettingsProps {
  matchSettings: MatchSettings;
}

export default function MatchSettingsConfig(props: MatchSettingsProps) {
  const matchSettings = props.matchSettings;

  function onGameModeSelect(value: GameMode) {
    matchSettings.gameMode = value;
  }

  return (
    <div className="container pb-2">
      <b>Configure match settings</b>
      {JSON.stringify(matchSettings)}
      <Dropdown>
        <Dropdown.Toggle variant="success" id="dropdown-basic">
          {matchSettings?.gameMode ?? 'Game mode'}
        </Dropdown.Toggle>

        <Dropdown.Menu>
          {Object.values(GameMode).map((mode) => (
            <Dropdown.Item key={mode} onClick={() => onGameModeSelect(mode)}>
              {mode}
            </Dropdown.Item>
          ))}
        </Dropdown.Menu>
      </Dropdown>
    </div>
  );
}
