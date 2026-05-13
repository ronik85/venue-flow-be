import { MigrationInterface, QueryRunner } from 'typeorm';

export class Indexing1778682303013 implements MigrationInterface {
  name = 'Indexing1778682303013';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "event_seats" DROP CONSTRAINT "FK_cfe3bae10e94401740bc65c698a"`,
    );
    await queryRunner.query(
      `ALTER TABLE "event_seats" ADD "version" integer NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "events" ADD "organizer_id" uuid NOT NULL`,
    );
    await queryRunner.query(
      `CREATE UNIQUE INDEX "IDX_d337bad9f3eb8b4c68aa9f5320" ON "seats" ("section_id", "row", "seat_number") `,
    );
    await queryRunner.query(
      `CREATE UNIQUE INDEX "IDX_1d6704d320d4f5fbef5f7b9310" ON "event_seats" ("event_id", "seat_id") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_c7d0e95293f80047a48a30ebf4" ON "event_seats" ("event_id", "status") `,
    );
    await queryRunner.query(
      `ALTER TABLE "event_seats" ADD CONSTRAINT "FK_cfe3bae10e94401740bc65c698a" FOREIGN KEY ("seat_id") REFERENCES "seats"("id") ON DELETE RESTRICT ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "events" ADD CONSTRAINT "FK_14c9ce53a2c2a1c781b8390123e" FOREIGN KEY ("organizer_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "events" DROP CONSTRAINT "FK_14c9ce53a2c2a1c781b8390123e"`,
    );
    await queryRunner.query(
      `ALTER TABLE "event_seats" DROP CONSTRAINT "FK_cfe3bae10e94401740bc65c698a"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_c7d0e95293f80047a48a30ebf4"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_1d6704d320d4f5fbef5f7b9310"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_d337bad9f3eb8b4c68aa9f5320"`,
    );
    await queryRunner.query(`ALTER TABLE "events" DROP COLUMN "organizer_id"`);
    await queryRunner.query(`ALTER TABLE "event_seats" DROP COLUMN "version"`);
    await queryRunner.query(
      `ALTER TABLE "event_seats" ADD CONSTRAINT "FK_cfe3bae10e94401740bc65c698a" FOREIGN KEY ("seat_id") REFERENCES "seats"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }
}
