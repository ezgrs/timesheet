import { type MigrationInterface, type QueryRunner } from "typeorm"

export class RenameUUIDFK1780257734682 implements MigrationInterface {
    name = "RenameUUIDFK1780257734682"

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "absences"
            RENAME CONSTRAINT "FK_5e995254fb8b90cfb91dcb9b074"
            TO "FK_absences_employeeid"
        `)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "absences"
            RENAME CONSTRAINT "FK_absences_employeeid"
            TO "FK_5e995254fb8b90cfb91dcb9b074"
        `)
    }
}
