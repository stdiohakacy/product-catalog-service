import { Product } from '@modules/product-catalog/domain/aggregates/product.aggregate';
import { ProductResponseDto } from '../dtos/product.response.dto';

export class ProductResponseMapper {
  static toResponse(product: Product): ProductResponseDto {
    const props = product.getProps();

    return {
      id: product.id.getValue(),
      name: props.name,
      description: props.description,
      imageUrls: props.imageUrls,
      price: props.price,
      availableItemCount: props.availableItemCount,
      category: {
        name: props.category.getName(),
        description: props.category.getDescription(),
      },
      reviews: (props.reviews ?? []).map((review) => ({
        userId: review.getUserId(),
        rating: review.getRating(),
        comment: review.getComment(),
        imageUrl: review.getImageUrl(),
      })),
      createdAt: product.createdAt,
      updatedAt: product.updatedAt,
    };
  }
}
