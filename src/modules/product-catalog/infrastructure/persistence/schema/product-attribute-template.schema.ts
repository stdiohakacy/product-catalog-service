import { BASE_SCHEMA } from '../../../../../libs/infrastructure/persistence/typeorm/schema/base.schema';

export const PRODUCT_ATTRIBUTE_TEMPLATE_SCHEMA = {
  TABLE_NAME: 'product_attribute_templates',
  COLUMNS: {
    ...BASE_SCHEMA.COLUMNS,
    categoryId: 'category_id',
    name: 'name',
    inputType: 'input_type', // enum | text | number | boolean | date
    isRequired: 'is_required',
    isFilterable: 'is_filterable',
    ordering: 'ordering',
    unit: 'unit', // optional: e.g. 'inch', 'GB'
  },
};
