import { BaseValueObject } from '@libs/domain';
import { ArgumentInvalidException } from '@libs/exceptions';
import { Guard } from '@libs/patterns';

export interface ProductCategoryProps {
  name: string;
  description?: string;
}

export class ProductCategory extends BaseValueObject<ProductCategoryProps> {
  constructor(props: ProductCategoryProps) {
    super(props);
  }

  protected validate(props: ProductCategoryProps): void {
    const { name, description } = props;

    if (Guard.isEmpty(name)) {
      throw new ArgumentInvalidException('Category name is required');
    }

    if (!Guard.lengthIsBetween(name, 2, 50)) {
      throw new ArgumentInvalidException(
        'Category name must be between 2 and 50 characters',
      );
    }

    if (description && !Guard.lengthIsBetween(description, 0, 200)) {
      throw new ArgumentInvalidException(
        'Category description must be <= 200 characters',
      );
    }
  }

  public getName(): string {
    return this.props.name;
  }

  public getDescription(): string | undefined {
    return this.props.description;
  }

  public static create(props: ProductCategoryProps): ProductCategory {
    return new ProductCategory(props);
  }
}
