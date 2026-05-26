import { MigrationInterface, QueryRunner } from 'typeorm';

export class BookingEnum1779787122872 implements MigrationInterface {
  name = 'BookingEnum1779787122872';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DROP INDEX "public"."IDX_bed0bf674c54bf792c6161f7f9"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_2917869bb47731126f4b3ce95d"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_8e2ceb5bc81c2ed54f8aa95ffd"`,
    );
    await queryRunner.query(
      `ALTER TYPE "public"."bookings_status_enum" RENAME TO "bookings_status_enum_old"`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."bookings_status_enum" AS ENUM('PENDING', 'CONFIRMED', 'CANCELLED', 'EXPIRED')`,
    );
    await queryRunner.query(
      `ALTER TABLE "bookings" ALTER COLUMN "status" DROP DEFAULT`,
    );
    await queryRunner.query(
      `ALTER TABLE "bookings" ALTER COLUMN "status" TYPE "public"."bookings_status_enum" USING "status"::"text"::"public"."bookings_status_enum"`,
    );
    await queryRunner.query(
      `ALTER TABLE "bookings" ALTER COLUMN "status" SET DEFAULT 'PENDING'`,
    );
    await queryRunner.query(`DROP TYPE "public"."bookings_status_enum_old"`);
    await queryRunner.query(
      `CREATE INDEX "IDX_2917869bb47731126f4b3ce95d" ON "bookings" ("event_id", "status") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_8e2ceb5bc81c2ed54f8aa95ffd" ON "bookings" ("user_id", "status") `,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DROP INDEX "public"."IDX_8e2ceb5bc81c2ed54f8aa95ffd"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_2917869bb47731126f4b3ce95d"`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."bookings_status_enum_old" AS ENUM('PENDING', 'CONFIRMED', 'CANCELLED')`,
    );
    await queryRunner.query(
      `ALTER TABLE "bookings" ALTER COLUMN "status" DROP DEFAULT`,
    );
    await queryRunner.query(
      `ALTER TABLE "bookings" ALTER COLUMN "status" TYPE "public"."bookings_status_enum_old" USING "status"::"text"::"public"."bookings_status_enum_old"`,
    );
    await queryRunner.query(
      `ALTER TABLE "bookings" ALTER COLUMN "status" SET DEFAULT 'PENDING'`,
    );
    await queryRunner.query(`DROP TYPE "public"."bookings_status_enum"`);
    await queryRunner.query(
      `ALTER TYPE "public"."bookings_status_enum_old" RENAME TO "bookings_status_enum"`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_8e2ceb5bc81c2ed54f8aa95ffd" ON "bookings" ("user_id", "status") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_2917869bb47731126f4b3ce95d" ON "bookings" ("event_id", "status") `,
    );
    await queryRunner.query(
      `CREATE UNIQUE INDEX "IDX_bed0bf674c54bf792c6161f7f9" ON "booking_items" ("event_seat_id") `,
    );
  }
}
