import { ProductCategory } from '../value-objects/product-category.vo';

describe('ProductCategory Value Object', () => {
  it('should create a valid ProductCategory', () => {
    const category = ProductCategory.create({
      name: 'Toys',
      description: 'Fun items for pets',
    });
    expect(category.getName()).toBe('Toys');
    expect(category.getDescription()).toBe('Fun items for pets');
  });

  it('should throw if name is empty', () => {
    expect(() =>
      ProductCategory.create({
        name: '',
        description: 'desc',
      }),
    ).toThrowError('Category name is required');
  });

  it('should throw if name is too short', () => {
    expect(() =>
      ProductCategory.create({
        name: 'A',
        description: 'desc',
      }),
    ).toThrowError('Category name must be between 2 and 50 characters');
  });

  it('should throw if name is too long', () => {
    expect(() =>
      ProductCategory.create({
        name: 'A'.repeat(51),
        description: 'desc',
      }),
    ).toThrowError('Category name must be between 2 and 50 characters');
  });

  it('should throw if description is too long', () => {
    expect(() =>
      ProductCategory.create({
        name: 'Toys',
        description: 'A'.repeat(201),
      }),
    ).toThrowError('Category description must be <= 200 characters');
  });

  it('should allow empty description', () => {
    const category = ProductCategory.create({
      name: 'Toys',
      description: '',
    });
    expect(category.getDescription()).toBe('');
  });

  it('should allow undefined description', () => {
    const category = ProductCategory.create({
      name: 'Toys',
    });
    expect(category.getDescription()).toBeUndefined();
  });
});
