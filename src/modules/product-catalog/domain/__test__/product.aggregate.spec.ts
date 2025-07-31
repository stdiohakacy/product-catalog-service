import { UniqueEntityID } from '@libs/domain/unique-entity-id';
import { ProductCategory } from '../value-objects/product-category.vo';
import { Product } from '../aggregates/product.aggregate';
import { ProductReview } from '../value-objects/product-review.vo';

describe('Product Aggregate', () => {
  const validCategory = ProductCategory.create({
    name: 'Accessories',
    description: 'Useful items for pets',
  });

  const validId = UniqueEntityID.create('11111111-1111-4111-8111-111111111111');

  const validProps = {
    name: 'Chew Toy',
    description: 'Safe and fun toy',
    imageUrls: ['https://example.com/image.jpg'],
    price: 20,
    availableItemCount: 50,
    category: validCategory,
  };

  it('should create a valid Product', () => {
    const product = Product.create({ id: validId, props: validProps });
    expect(product.id.getValue()).toBe(validId.getValue());
    expect(product.getProps().name).toBe('Chew Toy');
    expect(product.getProps().availableItemCount).toBe(50);
  });

  it('should throw if name is empty', () => {
    expect(() =>
      Product.create({
        id: validId,
        props: {
          ...validProps,
          name: '',
        },
      }),
    ).toThrowError('Product name is required');
  });

  it('should throw if price is negative', () => {
    expect(() =>
      Product.create({
        id: validId,
        props: {
          ...validProps,
          price: -5,
        },
      }),
    ).toThrowError('Product price must be >= 0');
  });

  it('should throw if availableItemCount is negative', () => {
    expect(() =>
      Product.create({
        id: validId,
        props: {
          ...validProps,
          availableItemCount: -1,
        },
      }),
    ).toThrowError('availableItemCount must be >= 0');
  });

  it('should throw if imageUrls contain empty string', () => {
    expect(() =>
      Product.create({
        id: validId,
        props: {
          ...validProps,
          imageUrls: [''],
        },
      }),
    ).toThrowError('Image URL cannot be empty');
  });

  it('should throw if category is missing', () => {
    expect(() =>
      Product.create({
        id: validId,
        props: {
          ...validProps,
          category: undefined as any,
        },
      }),
    ).toThrowError('Category is required');
  });

  it('should update price correctly', () => {
    const product = Product.create({ id: validId, props: validProps });
    product.updatePrice(25);
    expect(product.getProps().price).toBe(25);
  });

  it('should throw when updating price to negative', () => {
    const product = Product.create({ id: validId, props: validProps });
    expect(() => product.updatePrice(-1)).toThrowError('Price must be >= 0');
  });

  it('should change category correctly', () => {
    const product = Product.create({ id: validId, props: validProps });

    const newCategory = ProductCategory.create({
      name: 'Grooming',
      description: 'Items for grooming',
    });

    product.changeCategory(newCategory);
    expect(product.getProps().category.getName()).toBe('Grooming');
  });

  it('should throw when changing to empty category', () => {
    const product = Product.create({ id: validId, props: validProps });
    expect(() => product.changeCategory(undefined as any)).toThrowError(
      'New category cannot be empty',
    );
  });

  it('should add a review successfully', () => {
    const product = Product.create({ id: validId, props: validProps });

    product.addReview({
      userId: 'user-1',
      rating: 5,
      comment: 'Excellent product!',
      imageUrl: 'http://image.com/review.jpg',
    });

    expect(product.getProps().reviews?.length).toBe(1);
    expect(product.getProps().reviews?.[0]).toBeInstanceOf(ProductReview);
  });
});
