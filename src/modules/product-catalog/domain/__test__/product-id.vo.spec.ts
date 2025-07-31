import { ProductId } from '../value-objects/product-id.vo';

describe('ProductId Value Object', () => {
  it('should create ProductId from string', () => {
    const idStr = '123e4567-e89b-42d3-a456-426614174000';
    const productId = ProductId.fromString(idStr);
    expect(productId.getValue()).toBe(idStr);
  });

  it('should generate a new ProductId', () => {
    const productId = ProductId.generate();
    expect(productId.getValue()).toMatch(
      /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i,
    );
  });

  it('should be equal for same value', () => {
    const idStr = '123e4567-e89b-42d3-a456-426614174000';
    const id1 = ProductId.fromString(idStr);
    const id2 = ProductId.fromString(idStr);
    expect(id1.equals(id2)).toBe(true);
  });

  it('should not be equal for different values', () => {
    const id1 = ProductId.fromString('123e4567-e89b-42d3-a456-426614174000');
    const id2 = ProductId.fromString('223e4567-e89b-42d3-a456-426614174000');
    expect(id1.equals(id2)).toBe(false);
  });
});
