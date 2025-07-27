import { BASE_SCHEMA } from '../../../../../libs/infrastructure/persistence/typeorm/schema/base.schema';

export const BRAND_SCHEMA = {
  TABLE_NAME: 'brands',
  COLUMNS: {
    ...BASE_SCHEMA.COLUMNS,
    name: 'name',
    slug: 'slug',
    description: 'description',
    logoUrl: 'logo_url',
  },
  RELATED_MANY: {},
  RELATED_ONE: {},
};
