import { v4 as uuidv4 } from 'uuid';
import { ArgumentInvalidException } from '@libs/exceptions';
import { BaseValueObject } from '@libs/domain';

export class ProductId extends BaseValueObject<string> {
  constructor(value: string) {
    super({ value });
  }

  protected validate(props: { value: string }): void {
    const uuidRegex =
      /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

    if (!uuidRegex.test(props.value)) {
      throw new ArgumentInvalidException(
        `ProductId must be a valid UUID, received: ${props.value}`,
      );
    }
  }

  static create(value: string): ProductId {
    return new ProductId(value);
  }

  static generate(): ProductId {
    return new ProductId(uuidv4());
  }

  public getValue(): string {
    return this.props.value;
  }
}
