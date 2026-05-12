import { MigrationInterface, QueryRunner } from 'typeorm';

export class VenueSectionSchema1778580461906 implements MigrationInterface {
  name = 'VenueSectionSchema1778580461906';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "venue_sections" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "name" character varying(100) NOT NULL, CONSTRAINT "PK_0dca1996bf32a4d6c3f2ce8567c" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "venue_sections"`);
  }
}
