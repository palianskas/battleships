import { Ammo, AmmoType } from '../../../models/Ammo';
import LoggerService, { PatternTypes } from '../../LoggerService/LoggerService';
import {
  AttackCommandExpression,
  AttackCommandExpressionContext,
} from '../Expressions/AttackCommandExpression';
import { IExpression } from '../Expressions/Expressions';

export interface IInterpreter {
  interpret(input: string): void;
}

export class Interpreter implements IInterpreter {
  private _logger = LoggerService.Instance.getLogger(PatternTypes.Interpreter);

  interpret(input: string): void {
    const tokens = input
      .trim()
      .split(' ')
      .filter((token) => token.length > 0);

    if (!tokens[0].startsWith('/')) {
      this._logger.log(
        `INTERPRETER: Input does not start with a command. Input: ${input}`
      );

      return;
    }

    const expression = this.tryResolve(tokens);

    if (!expression) {
      this._logger.log(`INTERPRETER: Unable to parse input. Input: ${input}`);

      return;
    }

    expression.execute();
  }

  private tryResolve(tokens: string[]): IExpression | undefined {
    switch (tokens[0]) {
      case '/attack': {
        return this.tryResolveAttackCommandExpression(tokens);
      }
      case '/emote': {
        break;
      }
      case '/message': {
        break;
      }
      default: {
        return undefined;
      }
    }
  }

  private tryResolveAttackCommandExpression(
    tokens: string[]
  ): AttackCommandExpression | undefined {
    if (tokens.length < 4) {
      return undefined;
    }

    const ammoType = this.tryResolveAmmoType(tokens[1]);

    if (ammoType == null) {
      return undefined;
    }

    this._logger.log(`INTERPRETER: parsed ${AttackCommandExpression.name}`);

    return new AttackCommandExpression(
      new AttackCommandExpressionContext(
        ammoType,
        Number(tokens[2]),
        Number(tokens[3])
      )
    );
  }

  private tryResolveAmmoType(token: string): AmmoType | undefined {
    const index = parseInt(token, 10);

    if (!Number.isInteger(index)) {
      return undefined;
    }

    return index;
  }
}
