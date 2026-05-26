import { MigrationInterface, QueryRunner } from 'typeorm';

export class ExpiresAt1779789440070 implements MigrationInterface {
  name = 'ExpiresAt1779789440070';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "bookings" ADD "expires_at" TIMESTAMP WITH TIME ZONE`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "bookings" DROP COLUMN "expires_at"`);
  }
}
