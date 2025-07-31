export class ProductReviewResponseDto {
  userId: string;
  rating: number;
  comment: string;
  imageUrl: string;
}

export class ProductCategoryResponseDto {
  name: string;
  description?: string;
}

export class ProductResponseDto {
  id: string;
  name: string;
  description: string;
  imageUrls: string[];
  price: number;
  availableItemCount: number;
  category: ProductCategoryResponseDto;
  reviews: ProductReviewResponseDto[];
  createdAt: Date;
  updatedAt?: Date;
}
