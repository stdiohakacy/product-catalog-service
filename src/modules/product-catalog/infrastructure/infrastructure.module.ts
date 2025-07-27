import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BrandEntity } from './persistence/typeorm/entities/brand.entity';
import { CategoryEntity } from './persistence/typeorm/entities/category.entity';
import { ProductEntity } from './persistence/typeorm/entities/product.entity';
import { ProductVariantEntity } from './persistence/typeorm/entities/product-variant.entity';
import { ProductImageEntity } from './persistence/typeorm/entities/product-image.entity';
import { ProductAttributeEntity } from './persistence/typeorm/entities/product-attribute.entity';
import { ProductAttributeTemplateEntity } from './persistence/typeorm/entities/product-attribute-template.entity';
import { ProductAttributeTemplateValueEntity } from './persistence/typeorm/entities/product-attribute-template-value.entity';
@Module({
  imports: [
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
  providers: [],
  exports: [TypeOrmModule],
})
export class InfrastructureModule {}
