import { BASE_SCHEMA } from '../../../../../libs/infrastructure/persistence/typeorm/schema/base.schema';

export const PRODUCT_SCHEMA = {
  TABLE_NAME: 'products',
  COLUMNS: {
    ...BASE_SCHEMA.COLUMNS,
    name: 'name',
    description: 'description',
    imageUrls: 'image_urls',
    price: 'price',
    availableItemCount: 'available_item_count',
    category: 'category',
    reviews: 'reviews',
  },
  RELATED_ONE: {},
  RELATED_MANY: {},
};
