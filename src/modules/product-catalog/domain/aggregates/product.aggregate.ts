import { BaseAggregateRoot, CreateEntityProps } from '@libs/domain';
import { ProductCategory } from '../value-objects/product-category.vo';
import {
  ProductReview,
  ProductReviewProps,
} from '../value-objects/product-review.vo';
import { Guard } from '@libs/patterns';
import {
  ArgumentInvalidException,
  ArgumentOutOfRangeException,
  DomainInvalidException,
} from '@libs/exceptions';

export interface ProductProps {
  name: string;
  description: string;
  imageUrls: string[];
  price: number;
  availableItemCount: number;
  category: ProductCategory;
  reviews?: ProductReview[];
}

export class Product extends BaseAggregateRoot<ProductProps> {
  protected _id: string;

  constructor(props: CreateEntityProps<ProductProps>) {
    super(props);
  }

  public static create(entityProps?: CreateEntityProps<ProductProps>): Product {
    if (!entityProps) {
      throw new ArgumentInvalidException(
        'Entity props with id are required to create a Product',
      );
    }
    const product = new Product(entityProps);
    product.validate();
    return product;
  }

  validate(): void {
    const { name, price, category, imageUrls, availableItemCount } = this.props;

    if (Guard.isEmpty(name)) {
      throw new ArgumentInvalidException('Product name is required');
    }

    if (availableItemCount < 0) {
      throw new ArgumentOutOfRangeException('availableItemCount must be >= 0');
    }

    if (price < 0) {
      throw new ArgumentOutOfRangeException('Product price must be >= 0');
    }

    if (imageUrls && imageUrls.some((url) => Guard.isEmpty(url))) {
      throw new DomainInvalidException('Image URL cannot be empty');
    }

    if (!category) {
      throw new DomainInvalidException('Category is required');
    }
  }

  public updatePrice(newPrice: number): void {
    if (newPrice < 0) {
      throw new ArgumentOutOfRangeException('Price must be >= 0');
    }

    this.props.price = newPrice;
    this.markUpdated();
  }

  public addReview(reviewProps: ProductReviewProps): void {
    const review = ProductReview.create(reviewProps);
    this.props.reviews = [...this.props.reviews, review];
    this.markUpdated();
  }

  public changeCategory(newCategory: ProductCategory): void {
    if (!newCategory) {
      throw new ArgumentInvalidException('New category cannot be empty');
    }

    this.props.category = newCategory;
    this.markUpdated();
  }
}
