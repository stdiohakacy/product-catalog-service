import { UniqueEntityID } from '@libs/domain/unique-entity-id';

export class ProductId extends UniqueEntityID<string> {
  static fromString(value: string): ProductId {
    return new ProductId(value);
  }

  static generate(): ProductId {
    return new ProductId(crypto.randomUUID());
  }
}
