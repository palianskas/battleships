import { Button, ButtonGroup } from 'react-bootstrap';
import { Ammo } from '../../../models/Ammo';
import MatchProvider from '../../../services/MatchProvider/MatchProvider';

interface AmmoRackProps {
  onAmmoSelect: (ammo: Ammo) => void;
}

export default function AmmoRack({ onAmmoSelect }: AmmoRackProps) {
  const match = MatchProvider.Instance.match;

  return (
    <div className="w-100 d-flex justify-content-center mt-3">
      {match.availableAmmoTypes.map((ammo, index) => (
        <Button key={index} onClick={() => onAmmoSelect(ammo)}>
          {ammo.name}
        </Button>
      ))}
    </div>
  );
}
