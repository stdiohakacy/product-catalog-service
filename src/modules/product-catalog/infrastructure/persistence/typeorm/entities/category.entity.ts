import { Column, Entity, ManyToOne, OneToMany, JoinColumn } from 'typeorm';
import { CATEGORY_SCHEMA } from '../../schema/category.schema';
import { BaseOrmEntity } from '../../../../../../libs/infrastructure/persistence/typeorm/schema/base.orm';
import { ProductEntity } from './product.entity';
import { ProductAttributeTemplateEntity } from './product-attribute-template.entity';

@Entity(CATEGORY_SCHEMA.TABLE_NAME)
export class CategoryEntity extends BaseOrmEntity {
  @Column({ name: CATEGORY_SCHEMA.COLUMNS.name, type: 'varchar' })
  name: string;

  @Column({ name: CATEGORY_SCHEMA.COLUMNS.slug, type: 'varchar' })
  slug: string;

  @Column({
    name: CATEGORY_SCHEMA.COLUMNS.parentId,
    type: 'uuid',
    nullable: true,
  })
  parentId?: string;

  @Column({ name: CATEGORY_SCHEMA.COLUMNS.level, type: 'int', default: 0 })
  level: number;

  @Column({
    name: CATEGORY_SCHEMA.COLUMNS.imageUrl,
    type: 'varchar',
    nullable: true,
  })
  imageUrl?: string;

  @ManyToOne(() => CategoryEntity, (category) => category.children, {
    nullable: true,
  })
  @JoinColumn({ name: CATEGORY_SCHEMA.COLUMNS.parentId })
  parent?: CategoryEntity;

  @OneToMany(() => CategoryEntity, (category) => category.parent)
  children?: CategoryEntity[];

  @OneToMany(() => ProductEntity, (product) => product.category)
  products?: ProductEntity[];

  @OneToMany(
    () => ProductAttributeTemplateEntity,
    (template) => template.category,
  )
  attributeTemplates?: ProductAttributeTemplateEntity[];
}
