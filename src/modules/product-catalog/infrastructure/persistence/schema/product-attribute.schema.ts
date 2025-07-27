import { BASE_SCHEMA } from '../../../../../libs/infrastructure/persistence/typeorm/schema/base.schema';
import { PRODUCT_SCHEMA } from './product.schema';
import { PRODUCT_ATTRIBUTE_TEMPLATE_SCHEMA } from './product-attribute-template.schema';

export const PRODUCT_ATTRIBUTE_SCHEMA = {
  TABLE_NAME: 'product_attributes',
  COLUMNS: {
    ...BASE_SCHEMA.COLUMNS,
    productId: 'product_id', // hoặc variant_id nếu cần
    templateId: 'template_id',
    value: 'value',
  },
  RELATED_ONE: {},
  RELATED_MANY: {},
};
