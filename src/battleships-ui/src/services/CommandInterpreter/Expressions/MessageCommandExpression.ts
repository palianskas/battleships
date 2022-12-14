import { Player, PlayerTeam } from '../../../models/Player';
import ConnectionMediatorService, {
  MatchEventNames,
} from '../../ConnectionMediatorService/ConnectionMediatorService';
import LoggerService, { PatternTypes } from '../../LoggerService/LoggerService';
import MatchProvider from '../../MatchProvider/MatchProvider';
import { ExpressionContext, CommandExpression } from './Expressions';

export interface CommsEventProps {
  player: Player;
  message: string;
}

export class MessageCommandExpressionContext extends ExpressionContext {
  public message: string;

  constructor(message: string) {
    super();

    this.message = message;
  }
}

export class MessageCommandExpression extends CommandExpression {
  public context: MessageCommandExpressionContext;

  private _logger = LoggerService.Instance.getLogger(PatternTypes.Interpreter);

  constructor(context: MessageCommandExpressionContext) {
    super();

    this.context = context;
  }

  execute(): void {
    const player = MatchProvider.Instance.match.players.find(
      (p) => p.team === PlayerTeam.Blue
    )!;

    if (!player) {
      this._logger.log(
        `INTERPRETER: ${MessageCommandExpression.name} unable to execute. Player or Enemy is missing`
      );
      return;
    }

    const data: CommsEventProps = {
      player: player,
      message: this.context.message,
    };

    this._logger.log(`INTERPRETER: Executing ${MessageCommandExpression.name}`);

    ConnectionMediatorService.Instance.sendEvent(MatchEventNames.Message, data);
  }
}
