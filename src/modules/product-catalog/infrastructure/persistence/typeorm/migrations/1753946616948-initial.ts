import { MigrationInterface, QueryRunner } from "typeorm";

export class Initial1753946616948 implements MigrationInterface {
    name = 'Initial1753946616948'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "products" DROP CONSTRAINT "FK_9a5f6868c96e0069e699f33e124"`);
        await queryRunner.query(`ALTER TABLE "products" DROP CONSTRAINT "FK_1530a6f15d3c79d1b70be98f2be"`);
        await queryRunner.query(`ALTER TABLE "products" DROP COLUMN "sku"`);
        await queryRunner.query(`ALTER TABLE "products" DROP COLUMN "slug"`);
        await queryRunner.query(`ALTER TABLE "products" DROP COLUMN "thumbnail_url"`);
        await queryRunner.query(`ALTER TABLE "products" DROP COLUMN "status"`);
        await queryRunner.query(`ALTER TABLE "products" DROP COLUMN "category_id"`);
        await queryRunner.query(`ALTER TABLE "products" DROP COLUMN "brand_id"`);
        await queryRunner.query(`ALTER TABLE "products" ADD "image_urls" jsonb NOT NULL`);
        await queryRunner.query(`ALTER TABLE "products" ADD "price" numeric NOT NULL`);
        await queryRunner.query(`ALTER TABLE "products" ADD "available_item_count" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "products" ADD "category" jsonb NOT NULL`);
        await queryRunner.query(`ALTER TABLE "products" ADD "reviews" jsonb`);
        await queryRunner.query(`ALTER TABLE "products" ALTER COLUMN "description" SET NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "products" ALTER COLUMN "description" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "products" DROP COLUMN "reviews"`);
        await queryRunner.query(`ALTER TABLE "products" DROP COLUMN "category"`);
        await queryRunner.query(`ALTER TABLE "products" DROP COLUMN "available_item_count"`);
        await queryRunner.query(`ALTER TABLE "products" DROP COLUMN "price"`);
        await queryRunner.query(`ALTER TABLE "products" DROP COLUMN "image_urls"`);
        await queryRunner.query(`ALTER TABLE "products" ADD "brand_id" uuid`);
        await queryRunner.query(`ALTER TABLE "products" ADD "category_id" uuid`);
        await queryRunner.query(`ALTER TABLE "products" ADD "status" character varying NOT NULL DEFAULT 'draft'`);
        await queryRunner.query(`ALTER TABLE "products" ADD "thumbnail_url" character varying`);
        await queryRunner.query(`ALTER TABLE "products" ADD "slug" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "products" ADD "sku" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "products" ADD CONSTRAINT "FK_1530a6f15d3c79d1b70be98f2be" FOREIGN KEY ("brand_id") REFERENCES "brands"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "products" ADD CONSTRAINT "FK_9a5f6868c96e0069e699f33e124" FOREIGN KEY ("category_id") REFERENCES "categories"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
