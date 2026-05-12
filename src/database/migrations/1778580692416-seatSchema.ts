import { MigrationInterface, QueryRunner } from 'typeorm';

export class SeatSchema1778580692416 implements MigrationInterface {
  name = 'SeatSchema1778580692416';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "seats" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "row" character varying(10) NOT NULL, "seat_number" character varying(10) NOT NULL, "is_accessible" boolean NOT NULL DEFAULT false, CONSTRAINT "PK_3fbc74bb4638600c506dcb777a7" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "seats"`);
  }
}
