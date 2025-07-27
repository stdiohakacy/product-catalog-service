import { Column, Entity, ManyToOne, OneToMany, JoinColumn } from 'typeorm';
import { PRODUCT_VARIANT_SCHEMA } from '../../schema/product-variant.schema';
import { BaseOrmEntity } from '../../../../../../libs/infrastructure/persistence/typeorm/schema/base.orm';
import { ProductEntity } from './product.entity';
import { ProductImageEntity } from './product-image.entity';

@Entity(PRODUCT_VARIANT_SCHEMA.TABLE_NAME)
export class ProductVariantEntity extends BaseOrmEntity {
  @Column({ name: PRODUCT_VARIANT_SCHEMA.COLUMNS.sku, type: 'varchar' })
  sku: string;

  @Column({ name: PRODUCT_VARIANT_SCHEMA.COLUMNS.name, type: 'varchar' })
  name: string;

  @Column({ name: PRODUCT_VARIANT_SCHEMA.COLUMNS.price, type: 'float' })
  price: number;

  @Column({
    name: PRODUCT_VARIANT_SCHEMA.COLUMNS.originalPrice,
    type: 'float',
    nullable: true,
  })
  originalPrice?: number;

  @Column({ name: PRODUCT_VARIANT_SCHEMA.COLUMNS.currency, type: 'varchar' })
  currency: string;

  @Column({
    name: PRODUCT_VARIANT_SCHEMA.COLUMNS.thumbnailUrl,
    type: 'varchar',
    nullable: true,
  })
  thumbnailUrl?: string;

  @Column({
    name: PRODUCT_VARIANT_SCHEMA.COLUMNS.stock,
    type: 'int',
    default: 0,
  })
  stock: number;

  @Column({
    name: PRODUCT_VARIANT_SCHEMA.COLUMNS.isDefault,
    type: 'boolean',
    default: false,
  })
  isDefault: boolean;

  @Column({ name: PRODUCT_VARIANT_SCHEMA.COLUMNS.productId, type: 'uuid' })
  productId: string;

  @ManyToOne(() => ProductEntity, (product) => product.variants)
  @JoinColumn({ name: PRODUCT_VARIANT_SCHEMA.COLUMNS.productId })
  product: ProductEntity;

  @OneToMany(() => ProductImageEntity, (image) => image.variant)
  images?: ProductImageEntity[];
}
