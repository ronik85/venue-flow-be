import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrations1779105202170 implements MigrationInterface {
    name = 'Migrations1779105202170'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."events_status_enum" AS ENUM('DRAFT', 'PUBLISHED', 'CANCELLED', 'POSTPONED', 'COMPLETED')`);
        await queryRunner.query(`ALTER TABLE "events" ADD "status" "public"."events_status_enum" NOT NULL DEFAULT 'DRAFT'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "events" DROP COLUMN "status"`);
        await queryRunner.query(`DROP TYPE "public"."events_status_enum"`);
    }

}
