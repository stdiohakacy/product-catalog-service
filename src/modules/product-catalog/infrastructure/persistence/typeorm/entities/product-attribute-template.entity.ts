import { Column, Entity, ManyToOne, OneToMany, JoinColumn } from 'typeorm';
import { PRODUCT_ATTRIBUTE_TEMPLATE_SCHEMA } from '../../schema/product-attribute-template.schema';
import { BaseOrmEntity } from '../../../../../../libs/infrastructure/persistence/typeorm/schema/base.orm';
import { CategoryEntity } from './category.entity';
import { ProductAttributeTemplateValueEntity } from './product-attribute-template-value.entity';

@Entity(PRODUCT_ATTRIBUTE_TEMPLATE_SCHEMA.TABLE_NAME)
export class ProductAttributeTemplateEntity extends BaseOrmEntity {
  @Column({
    name: PRODUCT_ATTRIBUTE_TEMPLATE_SCHEMA.COLUMNS.name,
    type: 'varchar',
  })
  name: string;

  @Column({
    name: PRODUCT_ATTRIBUTE_TEMPLATE_SCHEMA.COLUMNS.inputType,
    type: 'varchar',
  })
  inputType: string;

  @Column({
    name: PRODUCT_ATTRIBUTE_TEMPLATE_SCHEMA.COLUMNS.isRequired,
    type: 'boolean',
    default: false,
  })
  isRequired: boolean;

  @Column({
    name: PRODUCT_ATTRIBUTE_TEMPLATE_SCHEMA.COLUMNS.isFilterable,
    type: 'boolean',
    default: false,
  })
  isFilterable: boolean;

  @Column({
    name: PRODUCT_ATTRIBUTE_TEMPLATE_SCHEMA.COLUMNS.ordering,
    type: 'int',
    default: 0,
  })
  ordering: number;

  @Column({
    name: PRODUCT_ATTRIBUTE_TEMPLATE_SCHEMA.COLUMNS.unit,
    type: 'varchar',
    nullable: true,
  })
  unit?: string;

  @Column({
    name: PRODUCT_ATTRIBUTE_TEMPLATE_SCHEMA.COLUMNS.categoryId,
    type: 'uuid',
  })
  categoryId: string;

  @ManyToOne(() => CategoryEntity, (category) => category.attributeTemplates)
  @JoinColumn({ name: PRODUCT_ATTRIBUTE_TEMPLATE_SCHEMA.COLUMNS.categoryId })
  category: CategoryEntity;

  @OneToMany(
    () => ProductAttributeTemplateValueEntity,
    (value) => value.template,
  )
  values?: ProductAttributeTemplateValueEntity[];
}
