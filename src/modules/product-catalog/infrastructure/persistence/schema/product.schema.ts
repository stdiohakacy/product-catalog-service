import { BASE_SCHEMA } from '../../../../../libs/infrastructure/persistence/typeorm/schema/base.schema';

export const PRODUCT_SCHEMA = {
  TABLE_NAME: 'products',
  COLUMNS: {
    ...BASE_SCHEMA.COLUMNS,
    sku: 'sku',
    name: 'name',
    slug: 'slug',
    description: 'description',
    categoryId: 'category_id',
    brandId: 'brand_id',
    thumbnailUrl: 'thumbnail_url',
    status: 'status', // draft | active | archived
  },

  RELATED_ONE: {},
  RELATED_MANY: {},
};
