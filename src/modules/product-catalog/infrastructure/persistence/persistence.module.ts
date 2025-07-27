import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeormConfig } from './typeorm/typeorm.config';
import { BrandEntity } from './typeorm/entities/brand.entity';
import { CategoryEntity } from './typeorm/entities/category.entity';
import { ProductEntity } from './typeorm/entities/product.entity';
import { ProductVariantEntity } from './typeorm/entities/product-variant.entity';
import { ProductImageEntity } from './typeorm/entities/product-image.entity';
import { ProductAttributeEntity } from './typeorm/entities/product-attribute.entity';
import { ProductAttributeTemplateEntity } from './typeorm/entities/product-attribute-template.entity';
import { ProductAttributeTemplateValueEntity } from './typeorm/entities/product-attribute-template-value.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({ ...typeormConfig, autoLoadEntities: true }),
    TypeOrmModule.forFeature([
      BrandEntity,
      CategoryEntity,
      ProductEntity,
      ProductVariantEntity,
      ProductImageEntity,
      ProductAttributeEntity,
      ProductAttributeTemplateEntity,
      ProductAttributeTemplateValueEntity,
    ]),
  ],
})
export class PersistenceModule {}
