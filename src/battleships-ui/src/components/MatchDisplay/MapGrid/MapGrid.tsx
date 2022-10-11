import classNames from 'classnames';
import { MapTile } from '../../../models/MatchMap';
import { Player } from '../../../models/Player';

import './MapGrid.css';

interface MapGridProps {
  player: Player;
  onTileSelect: (tile: MapTile) => void;
}

interface MapGridTileProps {
  tile: MapTile;
  onTileSelect: (tile: MapTile) => void;
}

export default function MapGrid({ player, onTileSelect }: MapGridProps) {
  return (
    <div className="w-100 d-flex justify-content-center">
      <div>
        {player.map.tiles.map((row, idxX) => (
          <div className="map-row" key={idxX}>
            {row.map((tile, idxY) => {
              return (
                <MapGridTile
                  tile={tile}
                  onTileSelect={onTileSelect}
                  key={idxY}
                ></MapGridTile>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}

function MapGridTile({ tile, onTileSelect }: MapGridTileProps) {
  return (
    <div
      className={classNames('map-tile', {
        grey: tile.isAttacked,
        red: tile.isShipPartDestroyed,
      })}
      onClick={() => onTileSelect(tile)}
    ></div>
  );
}
