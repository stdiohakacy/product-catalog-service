import { Column, Entity, ManyToOne, JoinColumn } from 'typeorm';
import { PRODUCT_ATTRIBUTE_TEMPLATE_VALUE_SCHEMA } from '../../schema/product-attribute-template-value.schema';
import { BaseOrmEntity } from '../../../../../../libs/infrastructure/persistence/typeorm/schema/base.orm';
import { ProductAttributeTemplateEntity } from './product-attribute-template.entity';

@Entity(PRODUCT_ATTRIBUTE_TEMPLATE_VALUE_SCHEMA.TABLE_NAME)
export class ProductAttributeTemplateValueEntity extends BaseOrmEntity {
  @Column({
    name: PRODUCT_ATTRIBUTE_TEMPLATE_VALUE_SCHEMA.COLUMNS.value,
    type: 'varchar',
  })
  value: string;

  @Column({
    name: PRODUCT_ATTRIBUTE_TEMPLATE_VALUE_SCHEMA.COLUMNS.templateId,
    type: 'uuid',
  })
  templateId: string;

  @ManyToOne(
    () => ProductAttributeTemplateEntity,
    (template) => template.values,
  )
  @JoinColumn({
    name: PRODUCT_ATTRIBUTE_TEMPLATE_VALUE_SCHEMA.COLUMNS.templateId,
  })
  template: ProductAttributeTemplateEntity;
}
