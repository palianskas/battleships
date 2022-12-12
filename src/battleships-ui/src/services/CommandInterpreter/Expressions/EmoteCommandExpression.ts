import { PlayerTeam } from '../../../models/Player';
import ConnectionMediatorService, {
  MatchEventNames,
} from '../../ConnectionMediatorService/ConnectionMediatorService';
import LoggerService, { PatternTypes } from '../../LoggerService/LoggerService';
import MatchProvider from '../../MatchProvider/MatchProvider';
import { ExpressionContext, CommandExpression } from './Expressions';

export interface EmoteEventProps {
  playerId: number;
  emote: string;
}

export class EmoteCommandExpressionContext extends ExpressionContext {
  public emote: string;

  constructor(emote: string) {
    super();

    this.emote = emote;
  }
}

export class EmoteCommandExpression extends CommandExpression {
  public context: EmoteCommandExpressionContext;

  private _logger = LoggerService.Instance.getLogger(PatternTypes.Interpreter);

  constructor(context: EmoteCommandExpressionContext) {
    super();

    this.context = context;
  }

  execute(): void {
    const player = MatchProvider.Instance.match.players.find(
      (p) => p.team === PlayerTeam.Blue
    )!;

    if (!player) {
      this._logger.log(
        `INTERPRETER: ${EmoteCommandExpression.name} unable to execute. Player or Enemy is missing`
      );
      return;
    }

    const data: EmoteEventProps = {
      playerId: player.id,
      emote: this.context.emote,
    };

    this._logger.log(`INTERPRETER: Executing ${EmoteCommandExpression.name}`);

    ConnectionMediatorService.Instance.sendEvent(MatchEventNames.Emote, data);
  }
}
