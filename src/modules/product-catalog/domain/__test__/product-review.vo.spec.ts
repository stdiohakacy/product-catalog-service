import { ProductReview } from '../value-objects/product-review.vo';

describe('ProductReview Value Object', () => {
  it('should create a valid ProductReview', () => {
    const review = ProductReview.create({
      userId: 'user-1',
      rating: 5,
      comment: 'Great product!',
      imageUrl: 'http://example.com/image.jpg',
    });
    expect(review.getUserId()).toBe('user-1');
    expect(review.getRating()).toBe(5);
    expect(review.getComment()).toBe('Great product!');
    expect(review.getImageUrl()).toBe('http://example.com/image.jpg');
  });

  it('should allow undefined imageUrl', () => {
    const review = ProductReview.create({
      userId: 'user-2',
      rating: 4,
      comment: 'Nice!',
    });
    expect(review.getImageUrl()).toBeUndefined();
  });

  it('should throw if userId is empty', () => {
    expect(() =>
      ProductReview.create({
        userId: '',
        rating: 4,
        comment: 'Nice!',
      }),
    ).toThrowError('Reviewer ID is required');
  });

  it('should throw if rating is less than 1', () => {
    expect(() =>
      ProductReview.create({
        userId: 'user-3',
        rating: 0,
        comment: 'Bad!',
      }),
    ).toThrowError('Rating must be between 1 and 5');
  });

  it('should throw if rating is greater than 5', () => {
    expect(() =>
      ProductReview.create({
        userId: 'user-3',
        rating: 6,
        comment: 'Too good!',
      }),
    ).toThrowError('Rating must be between 1 and 5');
  });

  it('should throw if comment is empty', () => {
    expect(() =>
      ProductReview.create({
        userId: 'user-4',
        rating: 3,
        comment: '',
      }),
    ).toThrowError('Review comment cannot be empty');
  });

  it('should throw if comment is too short', () => {
    expect(() =>
      ProductReview.create({
        userId: 'user-5',
        rating: 3,
        comment: 'Hi',
      }),
    ).toThrowError('Review must be between 3 and 500 characters');
  });

  it('should throw if comment is too long', () => {
    expect(() =>
      ProductReview.create({
        userId: 'user-6',
        rating: 3,
        comment: 'A'.repeat(501),
      }),
    ).toThrowError('Review must be between 3 and 500 characters');
  });

  it('should throw if imageUrl is invalid', () => {
    expect(() =>
      ProductReview.create({
        userId: 'user-7',
        rating: 4,
        comment: 'Nice product',
        imageUrl: 'ftp://invalid-url.com/image.jpg',
      }),
    ).toThrowError('Image URL must be a valid URL');
  });
});
