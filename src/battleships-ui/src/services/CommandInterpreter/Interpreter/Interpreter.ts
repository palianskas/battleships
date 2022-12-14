import { Ammo, AmmoType } from '../../../models/Ammo';
import LoggerService, { PatternTypes } from '../../LoggerService/LoggerService';
import {
  AttackCommandExpression,
  AttackCommandExpressionContext,
} from '../Expressions/AttackCommandExpression';
import {
  EmoteCommandExpression,
  EmoteCommandExpressionContext,
} from '../Expressions/EmoteCommandExpression';
import { IExpression } from '../Expressions/Expressions';
import {
  MessageCommandExpression,
  MessageCommandExpressionContext,
} from '../Expressions/MessageCommandExpression';
const AsciiEmojiParser = require('ascii-emoji-parser');

export interface IInterpreter {
  interpret(input: string): void;
}

export class Interpreter implements IInterpreter {
  private _logger = LoggerService.Instance.getLogger(PatternTypes.Interpreter);

  private emojiParser = new AsciiEmojiParser(':');

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
        return this.tryResolveEmoteCommandExpression(tokens);
      }
      case '/msg': {
        return this.tryResolveMessageCommandExpression(tokens);
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

  private tryResolveEmoteCommandExpression(
    tokens: string[]
  ): EmoteCommandExpression | undefined {
    if (tokens.length < 2) {
      return undefined;
    }

    const pureTokenValue = tokens[1].substring(1, tokens[1].length - 1);

    if (!AsciiEmojiParser.getKeywords().includes(pureTokenValue)) {
      return undefined;
    }

    this._logger.log(`INTERPRETER: parsed ${EmoteCommandExpression.name}`);

    const emote = this.emojiParser.parse(tokens[1]);

    return new EmoteCommandExpression(new EmoteCommandExpressionContext(emote));
  }

  private tryResolveMessageCommandExpression(
    tokens: string[]
  ): MessageCommandExpression | undefined {
    if (tokens.length < 2) {
      return undefined;
    }

    const messageTokens = tokens.splice(1);

    const message = messageTokens.join(' ');

    tokens.push(...messageTokens); // undo side-effects

    return new MessageCommandExpression(
      new MessageCommandExpressionContext(message)
    );
  }

  private tryResolveAmmoType(token: string): AmmoType | undefined {
    const index = parseInt(token, 10);

    if (!Number.isInteger(index) || !AmmoType[index]) {
      return undefined;
    }

    return index;
  }
}
