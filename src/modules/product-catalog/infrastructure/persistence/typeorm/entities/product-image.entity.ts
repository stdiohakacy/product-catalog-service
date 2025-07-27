import { Column, Entity, ManyToOne, JoinColumn } from 'typeorm';
import { PRODUCT_IMAGE_SCHEMA } from '../../schema/product-image.schema';
import { BaseOrmEntity } from '../../../../../../libs/infrastructure/persistence/typeorm/schema/base.orm';
import { ProductEntity } from './product.entity';
import { ProductVariantEntity } from './product-variant.entity';

@Entity(PRODUCT_IMAGE_SCHEMA.TABLE_NAME)
export class ProductImageEntity extends BaseOrmEntity {
  @Column({ name: PRODUCT_IMAGE_SCHEMA.COLUMNS.url, type: 'varchar' })
  url: string;

  @Column({
    name: PRODUCT_IMAGE_SCHEMA.COLUMNS.isThumbnail,
    type: 'boolean',
    default: false,
  })
  isThumbnail: boolean;

  @Column({
    name: PRODUCT_IMAGE_SCHEMA.COLUMNS.ordering,
    type: 'int',
    default: 0,
  })
  ordering: number;

  @Column({
    name: PRODUCT_IMAGE_SCHEMA.COLUMNS.productId,
    type: 'uuid',
    nullable: true,
  })
  productId?: string;

  @Column({
    name: PRODUCT_IMAGE_SCHEMA.COLUMNS.variantId,
    type: 'uuid',
    nullable: true,
  })
  variantId?: string;

  @ManyToOne(() => ProductEntity, (product) => product.images, {
    nullable: true,
  })
  @JoinColumn({ name: PRODUCT_IMAGE_SCHEMA.COLUMNS.productId })
  product?: ProductEntity;

  @ManyToOne(() => ProductVariantEntity, (variant) => variant.images, {
    nullable: true,
  })
  @JoinColumn({ name: PRODUCT_IMAGE_SCHEMA.COLUMNS.variantId })
  variant?: ProductVariantEntity;
}
