import { Column, Entity, ManyToOne, OneToMany, JoinColumn } from 'typeorm';
import { PRODUCT_SCHEMA } from '../../schema/product.schema';
import { CategoryEntity } from './category.entity';
import { BrandEntity } from './brand.entity';
import { BaseOrmEntity } from '../../../../../../libs/infrastructure/persistence/typeorm/schema/base.orm';
import { ProductVariantEntity } from './product-variant.entity';
import { ProductImageEntity } from './product-image.entity';
import { ProductAttributeEntity } from './product-attribute.entity';

@Entity(PRODUCT_SCHEMA.TABLE_NAME)
export class ProductEntity extends BaseOrmEntity {
  @Column({ name: PRODUCT_SCHEMA.COLUMNS.sku, type: 'varchar' })
  sku: string;

  @Column({ name: PRODUCT_SCHEMA.COLUMNS.name, type: 'varchar' })
  name: string;

  @Column({ name: PRODUCT_SCHEMA.COLUMNS.slug, type: 'varchar' })
  slug: string;

  @Column({
    name: PRODUCT_SCHEMA.COLUMNS.description,
    type: 'text',
    nullable: true,
  })
  description?: string;

  @Column({
    name: PRODUCT_SCHEMA.COLUMNS.thumbnailUrl,
    type: 'varchar',
    nullable: true,
  })
  thumbnailUrl?: string;

  @Column({
    name: PRODUCT_SCHEMA.COLUMNS.status,
    type: 'varchar',
    default: 'draft',
  })
  status: string;

  @ManyToOne(() => CategoryEntity, (category) => category.products)
  @JoinColumn({ name: PRODUCT_SCHEMA.COLUMNS.categoryId })
  category: CategoryEntity;

  @ManyToOne(() => BrandEntity, (brand) => brand.products)
  @JoinColumn({ name: PRODUCT_SCHEMA.COLUMNS.brandId })
  brand: BrandEntity;

  @OneToMany(() => ProductVariantEntity, (variant) => variant.product)
  variants?: ProductVariantEntity[];

  @OneToMany(() => ProductImageEntity, (image) => image.product)
  images?: ProductImageEntity[];

  @OneToMany(() => ProductAttributeEntity, (attribute) => attribute.product)
  attributes?: ProductAttributeEntity[];
}
