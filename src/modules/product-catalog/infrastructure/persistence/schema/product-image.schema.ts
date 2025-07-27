import { BASE_SCHEMA } from '../../../../../libs/infrastructure/persistence/typeorm/schema/base.schema';

export const PRODUCT_IMAGE_SCHEMA = {
  TABLE_NAME: 'product_images',
  COLUMNS: {
    ...BASE_SCHEMA.COLUMNS,
    productId: 'product_id',
    variantId: 'variant_id',
    url: 'url',
    isThumbnail: 'is_thumbnail',
    ordering: 'ordering',
  },
  RELATED_ONE: {},
  RELATED_MANY: {},
};
