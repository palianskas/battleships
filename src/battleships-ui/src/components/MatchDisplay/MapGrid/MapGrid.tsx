import classNames from 'classnames';
import { MapTile } from '../../../models/MatchMap';
import { Player, PlayerTeam } from '../../../models/Player';
import { ModularShipPart } from '../../../models/Ships/ShipPart';

import './MapGrid.css';
import { TileIcon } from '../../../models/Map/TileIcons';
import { MapTileStatus, MapTileType } from '../../../models/Map/MapTileFactory';

interface MapGridProps {
  player: Player;
  onTileSelect: (tile: MapTile) => void;
}

interface MapGridTileProps {
  tile: MapTile;
  onTileSelect: (tile: MapTile) => void;
  isEnemyMap: boolean;
}

export default function MapGrid({
  player,
  onTileSelect,
}: MapGridProps) {
  const isEnemyMap = player?.team == PlayerTeam.Red;

  return player ? (
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
                />
              );
            })}
          </div>
        ))}
      </div>
    </div>
  ) : (
    <div>Disconnected</div>
  );
}

function MapGridTile({
  tile,
  onTileSelect,
  isEnemyMap,
}: MapGridTileProps) {
  let shipPartHpString =
    tile.shipPart instanceof ModularShipPart && !isEnemyMap
      ? (tile.shipPart as ModularShipPart).hp.toString()
      : '';

  return (
    <div
      className={classNames('map-tile', tile.type.status !== MapTileStatus.shipPartDestroyed && tile.shipPart ? 'blue' : tile.type.color)}
      onClick={() => onTileSelect(tile)}
    >
      {tile.type.icon !== TileIcon.none && <i className={tile.type.icon}/>}
      <span className="map-tile-hp-span">{shipPartHpString}</span>
    </div>
  );
}
