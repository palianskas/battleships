export interface IExpression {
  execute(): void;
}

export abstract class ExpressionContext {}

export abstract class CommandExpression implements IExpression {
  public abstract context: ExpressionContext;

  abstract execute(): void;
}
