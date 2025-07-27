import { MigrationInterface, QueryRunner } from "typeorm";

export class Initial1753615407627 implements MigrationInterface {
    name = 'Initial1753615407627'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "product_attribute_template_values" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_date" TIMESTAMP NOT NULL DEFAULT now(), "created_user_id" uuid NOT NULL, "updated_date" TIMESTAMP DEFAULT now(), "updated_user_id" uuid, "deleted_date" TIMESTAMP, "deleted_user_id" uuid, "value" character varying NOT NULL, "template_id" uuid NOT NULL, CONSTRAINT "PK_e7062c7298a752b00d214353675" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "product_attribute_templates" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_date" TIMESTAMP NOT NULL DEFAULT now(), "created_user_id" uuid NOT NULL, "updated_date" TIMESTAMP DEFAULT now(), "updated_user_id" uuid, "deleted_date" TIMESTAMP, "deleted_user_id" uuid, "name" character varying NOT NULL, "input_type" character varying NOT NULL, "is_required" boolean NOT NULL DEFAULT false, "is_filterable" boolean NOT NULL DEFAULT false, "ordering" integer NOT NULL DEFAULT '0', "unit" character varying, "category_id" uuid NOT NULL, CONSTRAINT "PK_25e219090c7d0a62f8c49405033" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "categories" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_date" TIMESTAMP NOT NULL DEFAULT now(), "created_user_id" uuid NOT NULL, "updated_date" TIMESTAMP DEFAULT now(), "updated_user_id" uuid, "deleted_date" TIMESTAMP, "deleted_user_id" uuid, "name" character varying NOT NULL, "slug" character varying NOT NULL, "parent_id" uuid, "level" integer NOT NULL DEFAULT '0', "image_url" character varying, CONSTRAINT "PK_24dbc6126a28ff948da33e97d3b" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "brands" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_date" TIMESTAMP NOT NULL DEFAULT now(), "created_user_id" uuid NOT NULL, "updated_date" TIMESTAMP DEFAULT now(), "updated_user_id" uuid, "deleted_date" TIMESTAMP, "deleted_user_id" uuid, "name" character varying NOT NULL, "slug" character varying NOT NULL, "description" text, "logo_url" character varying, CONSTRAINT "PK_b0c437120b624da1034a81fc561" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "product_images" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_date" TIMESTAMP NOT NULL DEFAULT now(), "created_user_id" uuid NOT NULL, "updated_date" TIMESTAMP DEFAULT now(), "updated_user_id" uuid, "deleted_date" TIMESTAMP, "deleted_user_id" uuid, "url" character varying NOT NULL, "is_thumbnail" boolean NOT NULL DEFAULT false, "ordering" integer NOT NULL DEFAULT '0', "product_id" uuid, "variant_id" uuid, CONSTRAINT "PK_1974264ea7265989af8392f63a1" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "product_variants" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_date" TIMESTAMP NOT NULL DEFAULT now(), "created_user_id" uuid NOT NULL, "updated_date" TIMESTAMP DEFAULT now(), "updated_user_id" uuid, "deleted_date" TIMESTAMP, "deleted_user_id" uuid, "sku" character varying NOT NULL, "name" character varying NOT NULL, "price" double precision NOT NULL, "original_price" double precision, "currency" character varying NOT NULL, "thumbnail_url" character varying, "stock" integer NOT NULL DEFAULT '0', "is_default" boolean NOT NULL DEFAULT false, "product_id" uuid NOT NULL, CONSTRAINT "PK_281e3f2c55652d6a22c0aa59fd7" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "product_attributes" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_date" TIMESTAMP NOT NULL DEFAULT now(), "created_user_id" uuid NOT NULL, "updated_date" TIMESTAMP DEFAULT now(), "updated_user_id" uuid, "deleted_date" TIMESTAMP, "deleted_user_id" uuid, "value" character varying NOT NULL, "product_id" uuid NOT NULL, "template_id" uuid NOT NULL, CONSTRAINT "PK_4fa18fc5c893cb9894fc40ca921" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "products" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_date" TIMESTAMP NOT NULL DEFAULT now(), "created_user_id" uuid NOT NULL, "updated_date" TIMESTAMP DEFAULT now(), "updated_user_id" uuid, "deleted_date" TIMESTAMP, "deleted_user_id" uuid, "sku" character varying NOT NULL, "name" character varying NOT NULL, "slug" character varying NOT NULL, "description" text, "thumbnail_url" character varying, "status" character varying NOT NULL DEFAULT 'draft', "category_id" uuid, "brand_id" uuid, CONSTRAINT "PK_0806c755e0aca124e67c0cf6d7d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "product_attribute_template_values" ADD CONSTRAINT "FK_bde2c666d3ce545a99214ee7e39" FOREIGN KEY ("template_id") REFERENCES "product_attribute_templates"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "product_attribute_templates" ADD CONSTRAINT "FK_e048070500f9b250af52bdad3ce" FOREIGN KEY ("category_id") REFERENCES "categories"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "categories" ADD CONSTRAINT "FK_88cea2dc9c31951d06437879b40" FOREIGN KEY ("parent_id") REFERENCES "categories"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "product_images" ADD CONSTRAINT "FK_4f166bb8c2bfcef2498d97b4068" FOREIGN KEY ("product_id") REFERENCES "products"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "product_images" ADD CONSTRAINT "FK_7645bd68229997627f7b2191687" FOREIGN KEY ("variant_id") REFERENCES "product_variants"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "product_variants" ADD CONSTRAINT "FK_6343513e20e2deab45edfce1316" FOREIGN KEY ("product_id") REFERENCES "products"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "product_attributes" ADD CONSTRAINT "FK_f5a6700abd0494bae3032cf5bbd" FOREIGN KEY ("product_id") REFERENCES "products"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "product_attributes" ADD CONSTRAINT "FK_17de4f216821bf52e8d1b5120e0" FOREIGN KEY ("template_id") REFERENCES "product_attribute_templates"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "products" ADD CONSTRAINT "FK_9a5f6868c96e0069e699f33e124" FOREIGN KEY ("category_id") REFERENCES "categories"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "products" ADD CONSTRAINT "FK_1530a6f15d3c79d1b70be98f2be" FOREIGN KEY ("brand_id") REFERENCES "brands"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "products" DROP CONSTRAINT "FK_1530a6f15d3c79d1b70be98f2be"`);
        await queryRunner.query(`ALTER TABLE "products" DROP CONSTRAINT "FK_9a5f6868c96e0069e699f33e124"`);
        await queryRunner.query(`ALTER TABLE "product_attributes" DROP CONSTRAINT "FK_17de4f216821bf52e8d1b5120e0"`);
        await queryRunner.query(`ALTER TABLE "product_attributes" DROP CONSTRAINT "FK_f5a6700abd0494bae3032cf5bbd"`);
        await queryRunner.query(`ALTER TABLE "product_variants" DROP CONSTRAINT "FK_6343513e20e2deab45edfce1316"`);
        await queryRunner.query(`ALTER TABLE "product_images" DROP CONSTRAINT "FK_7645bd68229997627f7b2191687"`);
        await queryRunner.query(`ALTER TABLE "product_images" DROP CONSTRAINT "FK_4f166bb8c2bfcef2498d97b4068"`);
        await queryRunner.query(`ALTER TABLE "categories" DROP CONSTRAINT "FK_88cea2dc9c31951d06437879b40"`);
        await queryRunner.query(`ALTER TABLE "product_attribute_templates" DROP CONSTRAINT "FK_e048070500f9b250af52bdad3ce"`);
        await queryRunner.query(`ALTER TABLE "product_attribute_template_values" DROP CONSTRAINT "FK_bde2c666d3ce545a99214ee7e39"`);
        await queryRunner.query(`DROP TABLE "products"`);
        await queryRunner.query(`DROP TABLE "product_attributes"`);
        await queryRunner.query(`DROP TABLE "product_variants"`);
        await queryRunner.query(`DROP TABLE "product_images"`);
        await queryRunner.query(`DROP TABLE "brands"`);
        await queryRunner.query(`DROP TABLE "categories"`);
        await queryRunner.query(`DROP TABLE "product_attribute_templates"`);
        await queryRunner.query(`DROP TABLE "product_attribute_template_values"`);
    }

}
