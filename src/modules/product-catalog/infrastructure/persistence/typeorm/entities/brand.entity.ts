import { Column, Entity, OneToMany } from 'typeorm';
import { BRAND_SCHEMA } from '../../schema/brand.schema';
import { ProductEntity } from './product.entity';
import { BaseOrmEntity } from '../../../../../../libs/infrastructure/persistence/typeorm/schema/base.orm';

@Entity(BRAND_SCHEMA.TABLE_NAME)
export class BrandEntity extends BaseOrmEntity {
  @Column({ name: BRAND_SCHEMA.COLUMNS.name, type: 'varchar' })
  name: string;

  @Column({ name: BRAND_SCHEMA.COLUMNS.slug, type: 'varchar' })
  slug: string;

  @Column({
    name: BRAND_SCHEMA.COLUMNS.description,
    type: 'text',
    nullable: true,
  })
  description?: string;

  @Column({
    name: BRAND_SCHEMA.COLUMNS.logoUrl,
    type: 'varchar',
    nullable: true,
  })
  logoUrl?: string;

  @OneToMany(() => ProductEntity, (product) => product.brand)
  products?: ProductEntity[];
}
