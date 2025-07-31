import { Injectable } from '@nestjs/common';
import { MapperInterface } from '@libs/domain/mapper.interface';
import { Product } from '@modules/product-catalog/domain/aggregates/product.aggregate';
import { ProductEntity } from '../typeorm/entities/product.entity';
import { ProductCategory } from '@modules/product-catalog/domain/value-objects/product-category.vo';
import { ProductReview } from '@modules/product-catalog/domain/value-objects/product-review.vo';

@Injectable()
export class ProductMapper implements MapperInterface<Product, ProductEntity> {
  toDomain(entity: ProductEntity): Product {
    return Product.create({
      id: entity.id,
      createdAt: entity.createdDate,
      createdBy: entity.createdUserId,
      updatedAt: entity.updatedDate,
      updatedBy: entity.updatedUserId,
      deletedAt: entity.deletedDate,
      deletedBy: entity.deletedUserId,
      props: {
        name: entity.name,
        description: entity.description,
        imageUrls: entity.imageUrls,
        price: Number(entity.price),
        availableItemCount: entity.availableItemCount,
        category: new ProductCategory({
          name: entity.category.name,
          description: entity.category.description,
        }),
        reviews: (entity.reviews ?? []).map((review) =>
          ProductReview.create({
            userId: review.userId,
            rating: review.rating,
            comment: review.comment,
            imageUrl: review.imageUrl,
          }),
        ),
      },
    });
  }

  toPersistence(aggregate: Product): ProductEntity {
    const props = aggregate.getProps();

    const orm = new ProductEntity();
    orm.id = aggregate.id;
    orm.createdDate = aggregate.createdAt;
    orm.updatedDate = aggregate.updatedAt;
    orm.createdUserId = aggregate.createdBy;
    orm.updatedUserId = aggregate.updatedBy;
    orm.deletedDate = aggregate.deletedAt;
    orm.deletedUserId = aggregate.deletedBy;
    orm.name = props.name;
    orm.description = props.description;
    orm.imageUrls = props.imageUrls;
    orm.price = props.price;
    orm.availableItemCount = props.availableItemCount;
    orm.category = {
      name: props.category.getName(),
      description: props.category.getDescription(),
    };
    orm.reviews = (props.reviews ?? []).map((review) => ({
      userId: review.getUserId(),
      rating: review.getRating(),
      comment: review.getComment(),
      imageUrl: review.getImageUrl(),
    }));

    return orm;
  }
}
