import { type MigrationInterface, type QueryRunner } from "typeorm"

export class NormalizeAbsencesFKName1780258236980 implements MigrationInterface {
    name = "NormalizeAbsencesFKName1780258236980"

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `ALTER TABLE "absences" DROP CONSTRAINT "FK_absences_employeeid"`,
        )
        await queryRunner.query(
            `ALTER TABLE "absences" RENAME COLUMN "employeeId" TO "employeeid"`,
        )
        await queryRunner.query(
            `ALTER TABLE "absences" ADD CONSTRAINT "FK_absences_employeeid" FOREIGN KEY ("employeeid") REFERENCES "employees"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `ALTER TABLE "absences" DROP CONSTRAINT "FK_absences_employeeid"`,
        )
        await queryRunner.query(
            `ALTER TABLE "absences" RENAME COLUMN "employeeid" TO "employeeId"`,
        )
        await queryRunner.query(
            `ALTER TABLE "absences" ADD CONSTRAINT "FK_absences_employeeid" FOREIGN KEY ("employeeId") REFERENCES "employees"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
        )
    }
}
