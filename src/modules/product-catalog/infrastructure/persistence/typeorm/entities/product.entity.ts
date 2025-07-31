import { Column, Entity } from 'typeorm';
import { PRODUCT_SCHEMA } from '../../schema/product.schema';
import { BaseOrmEntity } from '../../../../../../libs/infrastructure/persistence/typeorm/schema/base.orm';

@Entity(PRODUCT_SCHEMA.TABLE_NAME)
export class ProductEntity extends BaseOrmEntity {
  @Column({
    name: PRODUCT_SCHEMA.COLUMNS.name,
    type: 'varchar',
  })
  name: string;

  @Column({ name: PRODUCT_SCHEMA.COLUMNS.description, type: 'text' })
  description: string;

  @Column({ name: PRODUCT_SCHEMA.COLUMNS.imageUrls, type: 'jsonb' })
  imageUrls: string[];

  @Column({ name: PRODUCT_SCHEMA.COLUMNS.price, type: 'numeric' })
  price: number;

  @Column({ name: PRODUCT_SCHEMA.COLUMNS.availableItemCount, type: 'int' })
  availableItemCount: number;

  @Column({ name: PRODUCT_SCHEMA.COLUMNS.category, type: 'jsonb' })
  category: {
    name: string;
    description?: string;
  };

  @Column({
    name: PRODUCT_SCHEMA.COLUMNS.reviews,
    type: 'jsonb',
    nullable: true,
  })
  reviews: {
    userId: string;
    rating: number;
    comment: string;
    imageUrl?: string;
  }[];
}
