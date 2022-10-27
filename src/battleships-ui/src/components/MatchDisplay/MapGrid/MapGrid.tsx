import classNames from 'classnames';
import { MapTile } from '../../../models/MatchMap';
import { Player, PlayerTeam } from '../../../models/Player';
import { ModularShipPart } from '../../../models/Ships/ShipPart';

import './MapGrid.css';

interface MapGridProps {
  player: Player;
  selectedTile: MapTile | null;
  onTileSelect: (tile: MapTile) => void;
}

interface MapGridTileProps {
  tile: MapTile;
  onTileSelect: (tile: MapTile) => void;
  isEnemyMap: boolean;
  isSelected: boolean;
}

export default function MapGrid({ player, selectedTile, onTileSelect }: MapGridProps) {
  const isEnemyMap = player?.team == PlayerTeam.Red;

  return (
    (player ? <div className="w-100 d-flex justify-content-center">
      <div>
        {player.map.tiles.map((row, idxX) => (
          <div className="map-row" key={idxX}>
            {row.map((tile, idxY) => {
              return (
                <MapGridTile
                  isSelected={selectedTile == tile}
                  tile={tile}
                  onTileSelect={onTileSelect}
                  isEnemyMap={isEnemyMap}
                  key={idxY}
                />
              );
            })}
          </div>
        ))}
      </div>
    </div> : <div>Disconnected</div> )

  );
}

function MapGridTile({ tile, onTileSelect, isEnemyMap, isSelected }: MapGridTileProps) {
  let shipPartHpString =
    tile.shipPart instanceof ModularShipPart && !isEnemyMap
      ? (tile.shipPart as ModularShipPart).hp.toString()
      : '';

  return (
    <div
      className={classNames('map-tile', resolveTileColorClass(isSelected))}
      onClick={() => onTileSelect(tile)}
    >
      <span className="map-tile-hp-span">{shipPartHpString}</span>
    </div>
  );

  function resolveTileColorClass(isSelected: boolean): string {
    if (isEnemyMap && !tile.isAttacked && !isSelected) {
      return '';
    }

    if (isSelected) {
      return 'grey';
    }

    if (tile.isShipPartDestroyed) {
      return 'red';
    }

    if (tile.shipPart) {
      return 'blue';
    }

    if (tile.isAttacked) {
      return 'yellow';
    }

    return '';
  }
}
