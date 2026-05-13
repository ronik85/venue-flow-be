import { MigrationInterface, QueryRunner } from 'typeorm';

export class VenueEventSeatSchema1778665687484 implements MigrationInterface {
  name = 'VenueEventSeatSchema1778665687484';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "venue_sections" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "name" character varying(100) NOT NULL, "venue_id" uuid NOT NULL, CONSTRAINT "PK_0dca1996bf32a4d6c3f2ce8567c" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "seats" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "row" character varying(10) NOT NULL, "seat_number" character varying(10) NOT NULL, "is_accessible" boolean NOT NULL DEFAULT false, "section_id" uuid NOT NULL, CONSTRAINT "PK_3fbc74bb4638600c506dcb777a7" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."event_seats_status_enum" AS ENUM('AVAILABLE', 'LOCKED', 'BOOKED')`,
    );
    await queryRunner.query(
      `CREATE TABLE "event_seats" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "event_id" uuid NOT NULL, "seat_id" uuid NOT NULL, "price" numeric(10,2) NOT NULL, "status" "public"."event_seats_status_enum" NOT NULL DEFAULT 'AVAILABLE', CONSTRAINT "PK_4aa60cc347dddeeef92e1989e1e" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "events" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "title" character varying(255) NOT NULL, "description" text, "start_time" TIMESTAMP WITH TIME ZONE NOT NULL, "venue_id" uuid NOT NULL, CONSTRAINT "PK_40731c7151fe4be3116e45ddf73" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "venues" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "name" character varying(255) NOT NULL, "city" character varying(255) NOT NULL, "address" character varying(255) NOT NULL, CONSTRAINT "PK_cb0f885278d12384eb7a81818be" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "venue_sections" ADD CONSTRAINT "FK_52d27f30c857c90b80fd501185c" FOREIGN KEY ("venue_id") REFERENCES "venues"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "seats" ADD CONSTRAINT "FK_d4078ee75800078fafc295ba456" FOREIGN KEY ("section_id") REFERENCES "venue_sections"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "event_seats" ADD CONSTRAINT "FK_c0bf9355892dbc07962668a97a9" FOREIGN KEY ("event_id") REFERENCES "events"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "event_seats" ADD CONSTRAINT "FK_cfe3bae10e94401740bc65c698a" FOREIGN KEY ("seat_id") REFERENCES "seats"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "events" ADD CONSTRAINT "FK_26e10dc1ae5cdd5a20279e08b4a" FOREIGN KEY ("venue_id") REFERENCES "venues"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "events" DROP CONSTRAINT "FK_26e10dc1ae5cdd5a20279e08b4a"`,
    );
    await queryRunner.query(
      `ALTER TABLE "event_seats" DROP CONSTRAINT "FK_cfe3bae10e94401740bc65c698a"`,
    );
    await queryRunner.query(
      `ALTER TABLE "event_seats" DROP CONSTRAINT "FK_c0bf9355892dbc07962668a97a9"`,
    );
    await queryRunner.query(
      `ALTER TABLE "seats" DROP CONSTRAINT "FK_d4078ee75800078fafc295ba456"`,
    );
    await queryRunner.query(
      `ALTER TABLE "venue_sections" DROP CONSTRAINT "FK_52d27f30c857c90b80fd501185c"`,
    );
    await queryRunner.query(`DROP TABLE "venues"`);
    await queryRunner.query(`DROP TABLE "events"`);
    await queryRunner.query(`DROP TABLE "event_seats"`);
    await queryRunner.query(`DROP TYPE "public"."event_seats_status_enum"`);
    await queryRunner.query(`DROP TABLE "seats"`);
    await queryRunner.query(`DROP TABLE "venue_sections"`);
  }
}
