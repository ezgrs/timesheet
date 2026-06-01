import { type MigrationInterface, type QueryRunner } from "typeorm"

export class AddInitialSchema1780240840723 implements MigrationInterface {
    name = "AddInitialSchema1780240840723"

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `CREATE TABLE "employees" ("id" SERIAL NOT NULL, "name" character varying(255) NOT NULL, "code" character(11) NOT NULL, "role" character varying NOT NULL, CONSTRAINT "PK_b9535a98350d5b26e7eb0c26af4" PRIMARY KEY ("id"))`,
        )
        await queryRunner.query(
            `CREATE TYPE "public"."absences_reason_enum" AS ENUM('annualLeave', 'sickLeave', 'medicalLeave', 'longServiceLeave')`,
        )
        await queryRunner.query(
            `CREATE TABLE "absences" ("id" SERIAL NOT NULL, "startdate" date NOT NULL, "enddate" date NOT NULL, "reason" "public"."absences_reason_enum", "employeeId" integer, CONSTRAINT "PK_bd79346866fea8ac6f269252748" PRIMARY KEY ("id"))`,
        )
        await queryRunner.query(
            `CREATE TYPE "public"."holidays_shift_enum" AS ENUM('am', 'pm')`,
        )
        await queryRunner.query(
            `CREATE TABLE "holidays" ("id" SERIAL NOT NULL, "date" date NOT NULL, "name" character varying(255) NOT NULL, "shift" "public"."holidays_shift_enum", CONSTRAINT "PK_3646bdd4c3817d954d830881dfe" PRIMARY KEY ("id"))`,
        )
        await queryRunner.query(
            `ALTER TABLE "absences" ADD CONSTRAINT "FK_5e995254fb8b90cfb91dcb9b074" FOREIGN KEY ("employeeId") REFERENCES "employees"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `ALTER TABLE "absences" DROP CONSTRAINT "FK_5e995254fb8b90cfb91dcb9b074"`,
        )
        await queryRunner.query(`DROP TABLE "holidays"`)
        await queryRunner.query(`DROP TYPE "public"."holidays_shift_enum"`)
        await queryRunner.query(`DROP TABLE "absences"`)
        await queryRunner.query(`DROP TYPE "public"."absences_reason_enum"`)
        await queryRunner.query(`DROP TABLE "employees"`)
    }
}
