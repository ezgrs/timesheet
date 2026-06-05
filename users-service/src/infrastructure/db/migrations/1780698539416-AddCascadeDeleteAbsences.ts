import { MigrationInterface, QueryRunner } from "typeorm";

export class AddCascadeDeleteAbsences1780698539416 implements MigrationInterface {
    name = 'AddCascadeDeleteAbsences1780698539416'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "absences" DROP CONSTRAINT "FK_absences_employeeid"`);
        await queryRunner.query(`ALTER TABLE "absences" ADD CONSTRAINT "FK_absences_employeeid" FOREIGN KEY ("employeeid") REFERENCES "employees"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "absences" DROP CONSTRAINT "FK_absences_employeeid"`);
        await queryRunner.query(`ALTER TABLE "absences" ADD CONSTRAINT "FK_absences_employeeid" FOREIGN KEY ("employeeid") REFERENCES "employees"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
