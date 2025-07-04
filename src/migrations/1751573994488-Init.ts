import { MigrationInterface, QueryRunner } from 'typeorm';

export class Init1751573994488 implements MigrationInterface {
  name = 'Init1751573994488';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "user_auth_tokens" ("id" SERIAL NOT NULL, "refresh_token" character varying NOT NULL, "access_token" character varying NOT NULL, "access_token_expired_at" TIMESTAMP WITH TIME ZONE NOT NULL, "refresh_token_expired_at" TIMESTAMP WITH TIME ZONE NOT NULL, "user_id" integer NOT NULL, CONSTRAINT "PK_e15c7c76bf967080b272104d828" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "user_entity" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "email" character varying NOT NULL, "password" text NOT NULL, "deleted_at" TIMESTAMP, "created_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_415c35b9b3b6fe45a3b065030f5" UNIQUE ("email"), CONSTRAINT "PK_b54f8ea623b17094db7667d8206" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."article_entity_type_enum" AS ENUM('public', 'private')`,
    );
    await queryRunner.query(
      `CREATE TABLE "article_entity" ("id" SERIAL NOT NULL, "title" text NOT NULL, "summary" text NOT NULL, "type" "public"."article_entity_type_enum" NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, CONSTRAINT "PK_362cadb16e72c369a1406924e2d" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "tag_entity" ("id" SERIAL NOT NULL, "title" character varying NOT NULL, CONSTRAINT "PK_98efc66e2a1ce7fa1425e21e468" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "article_tags" ("article_entity_id" integer NOT NULL, "tag_entity_id" integer NOT NULL, CONSTRAINT "PK_d04d30be37a044c911985e27a90" PRIMARY KEY ("article_entity_id", "tag_entity_id"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_17a729f04e3ea24ff94151c27e" ON "article_tags" ("article_entity_id") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_1a28549b16a12f5756d8f7456c" ON "article_tags" ("tag_entity_id") `,
    );
    await queryRunner.query(
      `ALTER TABLE "user_auth_tokens" ADD CONSTRAINT "FK_bab7def1955bd13dcc47c036c03" FOREIGN KEY ("user_id") REFERENCES "user_entity"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "article_tags" ADD CONSTRAINT "FK_17a729f04e3ea24ff94151c27e9" FOREIGN KEY ("article_entity_id") REFERENCES "article_entity"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "article_tags" ADD CONSTRAINT "FK_1a28549b16a12f5756d8f7456ca" FOREIGN KEY ("tag_entity_id") REFERENCES "tag_entity"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "article_tags" DROP CONSTRAINT "FK_1a28549b16a12f5756d8f7456ca"`,
    );
    await queryRunner.query(
      `ALTER TABLE "article_tags" DROP CONSTRAINT "FK_17a729f04e3ea24ff94151c27e9"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_auth_tokens" DROP CONSTRAINT "FK_bab7def1955bd13dcc47c036c03"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_1a28549b16a12f5756d8f7456c"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_17a729f04e3ea24ff94151c27e"`,
    );
    await queryRunner.query(`DROP TABLE "article_tags"`);
    await queryRunner.query(`DROP TABLE "tag_entity"`);
    await queryRunner.query(`DROP TABLE "article_entity"`);
    await queryRunner.query(`DROP TYPE "public"."article_entity_type_enum"`);
    await queryRunner.query(`DROP TABLE "user_entity"`);
    await queryRunner.query(`DROP TABLE "user_auth_tokens"`);
  }
}
