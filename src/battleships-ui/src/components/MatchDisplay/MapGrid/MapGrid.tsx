import classNames from 'classnames';
import { MapTile } from '../../../models/MatchMap';
import { Player, PlayerTeam } from '../../../models/Player';
import { ModularShipPart } from '../../../models/Ships/ShipPart';

import './MapGrid.css';

interface MapGridProps {
  player: Player;
  onTileSelect: (tile: MapTile) => void;
}

interface MapGridTileProps {
  tile: MapTile;
  onTileSelect: (tile: MapTile) => void;
  isEnemyMap: boolean;
}

export default function MapGrid({ player, onTileSelect }: MapGridProps) {
  const isEnemyMap = player.team == PlayerTeam.Red;

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
                  isEnemyMap={isEnemyMap}
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

function MapGridTile({ tile, onTileSelect, isEnemyMap }: MapGridTileProps) {
  let shipPartHpString =
    tile.shipPart instanceof ModularShipPart && !isEnemyMap
      ? (tile.shipPart as ModularShipPart).hp.toString()
      : '';

  return (
    <div
      className={classNames('map-tile', resolveTileColorClass())}
      onClick={() => onTileSelect(tile)}
    >
      <span className="map-tile-hp-span">{shipPartHpString}</span>
    </div>
  );

  function resolveTileColorClass(): string {
    if (isEnemyMap && !tile.isAttacked) {
      return '';
    }

    if (tile.isShipPartDestroyed) {
      return 'red';
    }

    if (tile.shipPart) {
      return 'blue';
    }

    if (tile.isAttacked) {
      return 'grey';
    }

    return '';
  }
}
