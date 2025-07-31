import { BaseValueObject } from '@libs/domain';
import { Guard } from '@libs/patterns';
import { ArgumentInvalidException } from '@libs/exceptions';

export interface ProductReviewProps {
  userId: string;
  rating: number;
  comment: string;
  imageUrl?: string;
}

export class ProductReview extends BaseValueObject<ProductReviewProps> {
  constructor(props: ProductReviewProps) {
    super(props);
  }

  protected validate(props: ProductReviewProps): void {
    const { userId, rating, comment, imageUrl } = props;

    if (Guard.isEmpty(userId)) {
      throw new ArgumentInvalidException('Reviewer ID is required');
    }

    if (rating < 1 || rating > 5) {
      throw new ArgumentInvalidException('Rating must be between 1 and 5');
    }

    if (Guard.isEmpty(comment)) {
      throw new ArgumentInvalidException('Review comment cannot be empty');
    }

    if (!Guard.lengthIsBetween(comment, 3, 500)) {
      throw new ArgumentInvalidException(
        'Review must be between 3 and 500 characters',
      );
    }

    if (imageUrl && !imageUrl.startsWith('http')) {
      throw new ArgumentInvalidException('Image URL must be a valid URL');
    }
  }

  public static create(props: ProductReviewProps): ProductReview {
    return new ProductReview(props);
  }

  public getUserId(): string {
    return this.props.userId;
  }

  public getRating(): number {
    return this.props.rating;
  }

  public getComment(): string {
    return this.props.comment;
  }

  public getImageUrl(): string | undefined {
    return this.props.imageUrl;
  }
}
