import { MigrationInterface, QueryRunner } from 'typeorm';

export class Initial1753978461672 implements MigrationInterface {
  name = 'Initial1753978461672';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "products" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_date" TIMESTAMP NOT NULL DEFAULT now(), "created_user_id" uuid NOT NULL, "updated_date" TIMESTAMP DEFAULT now(), "updated_user_id" uuid, "deleted_date" TIMESTAMP, "deleted_user_id" uuid, "name" character varying NOT NULL, "description" text NOT NULL, "image_urls" jsonb NOT NULL, "price" numeric NOT NULL, "available_item_count" integer NOT NULL, "category" jsonb NOT NULL, "reviews" jsonb, CONSTRAINT "PK_0806c755e0aca124e67c0cf6d7d" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "products"`);
  }
}
