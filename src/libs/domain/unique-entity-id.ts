import { ArgumentInvalidException } from '@libs/exceptions';
import { BaseValueObject } from './vo.base';

export class UniqueEntityID<T extends string | number> extends BaseValueObject<{
  value: T;
}> {
  constructor(value: T) {
    super({ value });
  }

  protected validate(props: { value: T }): void {
    if (typeof props.value === 'string') {
      const uuidRegex =
        /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
      if (!uuidRegex.test(props.value)) {
        throw new ArgumentInvalidException(`Invalid UUID format`);
      }
    } else if (typeof props.value === 'number') {
      if (!Number.isInteger(props.value) || props.value <= 0) {
        throw new ArgumentInvalidException(
          `UniqueEntityID number must be a positive integer`,
        );
      }
    }
  }

  static create<T extends string | number>(value: T): UniqueEntityID<T> {
    return new UniqueEntityID(value);
  }

  public getValue(): T {
    return this.props.value;
  }
}
