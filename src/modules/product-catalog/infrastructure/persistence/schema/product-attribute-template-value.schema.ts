import { BASE_SCHEMA } from '../../../../../libs/infrastructure/persistence/typeorm/schema/base.schema';

export const PRODUCT_ATTRIBUTE_TEMPLATE_VALUE_SCHEMA = {
  TABLE_NAME: 'product_attribute_template_values',
  COLUMNS: {
    ...BASE_SCHEMA.COLUMNS,
    templateId: 'template_id',
    value: 'value',
  },
  RELATED_ONE: {},
  RELATED_MANY: {},
};
