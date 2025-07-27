import { BASE_SCHEMA } from '../../../../../libs/infrastructure/persistence/typeorm/schema/base.schema';

export const PRODUCT_VARIANT_SCHEMA = {
  TABLE_NAME: 'product_variants',
  COLUMNS: {
    ...BASE_SCHEMA.COLUMNS,
    productId: 'product_id',
    sku: 'sku',
    name: 'name',
    price: 'price',
    originalPrice: 'original_price',
    currency: 'currency',
    thumbnailUrl: 'thumbnail_url',
    stock: 'stock',
    isDefault: 'is_default',
  },
  RELATED_ONE: {},
  RELATED_MANY: {},
};
