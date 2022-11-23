import classNames from 'classnames';
import { MapTile } from '../../../models/MatchMap';
import { Player, PlayerTeam } from '../../../models/Player';
import { ModularShipPart } from '../../../models/Ships/ShipPart';

import './MapGrid.css';
import { SelectedTileDecorator } from '../../../models/Map/SelectedTileDecorator';
import { DestroyedTileDecorator } from '../../../models/Map/DestroyedTileDecorator';
import { ShipPartTileDecorator } from '../../../models/Map/ShipPartTileDecorator';
import { AttackedTileDecorator } from '../../../models/Map/AttackedTileDecorator';

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

export default function MapGrid({
  player,
  selectedTile,
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
    </div>
  ) : (
    <div>Disconnected</div>
  );
}

function MapGridTile({
  tile,
  onTileSelect,
  isEnemyMap,
  isSelected,
}: MapGridTileProps) {
  let shipPartHpString =
    tile.shipPart instanceof ModularShipPart && !isEnemyMap
      ? (tile.shipPart as ModularShipPart).hp.toString()
      : '';

  if (isSelected) {
    tile = new SelectedTileDecorator(tile);
  }
  if (tile.isShipPartDestroyed) {
    tile = new DestroyedTileDecorator(tile);
  }
  if (tile.shipPart) {
    tile = new ShipPartTileDecorator(tile);
  }
  if (tile.isAttacked) {
    tile = new AttackedTileDecorator(tile);
  }

  return (
    <div
      className={classNames('map-tile', tile.getColor())}
      onClick={() => onTileSelect(tile)}
    >
      <span className="map-tile-hp-span">{shipPartHpString}</span>
    </div>
  );
}
