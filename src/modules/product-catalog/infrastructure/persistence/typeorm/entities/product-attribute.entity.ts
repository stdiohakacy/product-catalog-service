import { Column, Entity, ManyToOne, JoinColumn } from 'typeorm';
import { PRODUCT_ATTRIBUTE_SCHEMA } from '../../schema/product-attribute.schema';
import { BaseOrmEntity } from '../../../../../../libs/infrastructure/persistence/typeorm/schema/base.orm';
import { ProductEntity } from './product.entity';
import { ProductAttributeTemplateEntity } from './product-attribute-template.entity';

@Entity(PRODUCT_ATTRIBUTE_SCHEMA.TABLE_NAME)
export class ProductAttributeEntity extends BaseOrmEntity {
  @Column({ name: PRODUCT_ATTRIBUTE_SCHEMA.COLUMNS.value, type: 'varchar' })
  value: string;

  @Column({ name: PRODUCT_ATTRIBUTE_SCHEMA.COLUMNS.productId, type: 'uuid' })
  productId: string;

  @Column({
    name: PRODUCT_ATTRIBUTE_SCHEMA.COLUMNS.templateId,
    type: 'uuid',
  })
  templateId: string;

  @ManyToOne(() => ProductEntity, (product) => product.attributes)
  @JoinColumn({ name: PRODUCT_ATTRIBUTE_SCHEMA.COLUMNS.productId })
  product: ProductEntity;

  @ManyToOne(() => ProductAttributeTemplateEntity, (template) => template)
  @JoinColumn({ name: PRODUCT_ATTRIBUTE_SCHEMA.COLUMNS.templateId })
  template: ProductAttributeTemplateEntity;
}
