import { AmmoType } from '../../../models/Ammo';
import { PlayerTeam } from '../../../models/Player';
import ConnectionMediatorService, {
  MatchEventNames,
} from '../../ConnectionMediatorService/ConnectionMediatorService';
import LoggerService, { PatternTypes } from '../../LoggerService/LoggerService';
import MatchProvider from '../../MatchProvider/MatchProvider';
import { AttackTurnEventProps } from '../../TurnHandler/TurnHandler';
import { ExpressionContext, CommandExpression } from './Expressions';

export class AttackCommandExpressionContext extends ExpressionContext {
  public ammoType: AmmoType;
  public posX: number;
  public posY: number;

  constructor(ammoType: AmmoType, posX: number, posY: number) {
    super();

    this.ammoType = ammoType;
    this.posX = posX;
    this.posY = posY;
  }
}

export class AttackCommandExpression extends CommandExpression {
  public context: AttackCommandExpressionContext;

  private _logger = LoggerService.Instance.getLogger(PatternTypes.Interpreter);

  constructor(context: AttackCommandExpressionContext) {
    super();

    this.context = context;
  }

  execute(): void {
    const match = MatchProvider.Instance.match;

    const player = match.players.find((p) => p.team === PlayerTeam.Blue)!;
    const enemy = match.players.find((p) => p.team === PlayerTeam.Red)!;

    if (!player || !enemy) {
      this._logger.log(
        `INTERPRETER: ${AttackCommandExpression.name} unable to execute. Player or Enemy is missing`
      );
      return;
    }

    const tile = enemy.map.tiles[this.context.posX][this.context.posY];

    const data: AttackTurnEventProps = {
      offencePlayerId: player.id,
      defencePlayerId: enemy.id,
      tile: tile,
      ammoType: this.context.ammoType,
    };

    this._logger.log(`INTERPRETER: Executing ${AttackCommandExpression.name}`);

    ConnectionMediatorService.Instance.sendEvent(
      MatchEventNames.AttackPerformed,
      data
    );
  }
}
