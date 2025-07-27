import { BASE_SCHEMA } from '../../../../../libs/infrastructure/persistence/typeorm/schema/base.schema';
import { PRODUCT_SCHEMA } from './product.schema';
import { PRODUCT_ATTRIBUTE_TEMPLATE_SCHEMA } from './product-attribute-template.schema';

export const CATEGORY_SCHEMA = {
  TABLE_NAME: 'categories',
  COLUMNS: {
    ...BASE_SCHEMA.COLUMNS,
    name: 'name',
    slug: 'slug',
    parentId: 'parent_id',
    level: 'level',
    imageUrl: 'image_url',
  },
  RELATED_ONE: {},
  RELATED_MANY: {},
};
