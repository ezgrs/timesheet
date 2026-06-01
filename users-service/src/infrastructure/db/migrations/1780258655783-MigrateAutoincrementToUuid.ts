import {
    MigrationInterface,
    QueryRunner,
    TableColumn,
    TableForeignKey,
} from "typeorm"

type Table = {
    name: string
    pkName: string
}

const tables: Table[] = [
    { name: "holidays", pkName: "PK_3646bdd4c3817d954d830881dfe" },
    { name: "absences", pkName: "PK_bd79346866fea8ac6f269252748" },
    { name: "employees", pkName: "PK_b9535a98350d5b26e7eb0c26af4" },
]

export class MigrateAutoincrementToUuid1780258655783 implements MigrationInterface {
    name = "MigrateAutoincrementToUuid1780258655783"

    public async up(queryRunner: QueryRunner): Promise<void> {
        // Guarantees `id_new` populated to all tables
        for (const table of tables) {
            await queryRunner.addColumn(
                table.name,
                new TableColumn({
                    name: "id_new",
                    type: "uuid",
                    default: "gen_random_uuid()",
                }),
            )
            await queryRunner.query(
                `UPDATE "${table.name}" ` +
                    `SET "id_new" = gen_random_uuid() ` +
                    `WHERE "id_new" IS NULL`,
            )
            await queryRunner.query(
                `ALTER TABLE "${table.name}" ALTER COLUMN "id_new" SET NOT NULL`,
            )
        }

        // Guarantees `employeeid_new` populated to `absences`
        await queryRunner.addColumn(
            "absences",
            new TableColumn({
                name: "employeeid_new",
                type: "uuid",
                isNullable: true,
            }),
        )
        await queryRunner.query(
            `UPDATE "absences" ` +
                `SET "employeeid_new" = "employees"."id_new" ` +
                `FROM "employees" ` +
                `WHERE "absences"."employeeid" = "employees"."id"`,
        )
        await queryRunner.query(
            `ALTER TABLE "absences" ALTER COLUMN "employeeid_new" SET NOT NULL`,
        )

        // Guarantees `employeeid` as UUID to `absences`
        await queryRunner.dropForeignKey("absences", "FK_absences_employeeid")
        await queryRunner.dropColumn("absences", "employeeid")
        await queryRunner.renameColumn(
            "absences",
            "employeeid_new",
            "employeeid",
        )

        // Guarantees `id` as UUID to all tables
        for (const table of tables) {
            await queryRunner.dropPrimaryKey(table.name, table.pkName)
            await queryRunner.dropColumn(table.name, "id")

            await queryRunner.renameColumn(table.name, "id_new", "id")
            await queryRunner.createPrimaryKey(
                table.name,
                ["id"],
                `PK_${table.name}`,
            )
        }

        // Add foreign key to `absences` based on new `employees`.`id`
        await queryRunner.createForeignKey(
            "absences",
            new TableForeignKey({
                name: "FK_absences_employeeid",
                columnNames: ["employeeid"],
                referencedTableName: "employees",
                referencedColumnNames: ["id"],
            }),
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // Guarantees `id_old` populated to all tables
        for (const table of tables) {
            await queryRunner.addColumn(
                table.name,
                new TableColumn({
                    name: "id_old",
                    type: "bigint",
                    isGenerated: true,
                    generatedIdentity: "BY DEFAULT",
                }),
            )
            await queryRunner.query(
                `UPDATE "${table.name}" SET "id_old" = DEFAULT WHERE "id_old" IS NULL`,
            )
            await queryRunner.query(
                `ALTER TABLE "${table.name}" ALTER COLUMN "id_old" SET NOT NULL`,
            )
        }

        // Guarantees `employeeid_old` populated to `absences`
        await queryRunner.addColumn(
            "absences",
            new TableColumn({
                name: "employeeid_old",
                type: "int",
            }),
        )
        await queryRunner.query(
            `UPDATE "absences" ` +
                `SET "employeeid_old" = "employees"."id_old" ` +
                `FROM "employees" ` +
                `WHERE "absences"."employeeid" = "employees"."id"`,
        )
        await queryRunner.query(
            `ALTER TABLE "absences" ALTER COLUMN "employeeid_old" SET NOT NULL`,
        )

        // Guarantees `employeeid` as int to `absences`
        await queryRunner.dropForeignKey("absences", "FK_absences_employeeid")
        await queryRunner.dropColumn("absences", "employeeid")
        await queryRunner.renameColumn(
            "absences",
            "employeeid_old",
            "employeeid",
        )

        // Guarantees `id` as int to all tables
        for (const table of tables) {
            await queryRunner.dropPrimaryKey(table.name, `PK_${table.name}`)
            await queryRunner.dropColumn(table.name, "id")

            await queryRunner.renameColumn(table.name, "id_old", "id")
            await queryRunner.query(
                `ALTER SEQUENCE "${table.name}_id_old_seq" RENAME TO "${table.name}_id_seq"`,
            )
            await queryRunner.createPrimaryKey(table.name, ["id"], table.pkName)
        }

        // Add foreign key to `absences` based on new `employees`.`id`
        await queryRunner.createForeignKey(
            "absences",
            new TableForeignKey({
                name: "FK_absences_employeeid",
                columnNames: ["employeeid"],
                referencedTableName: "employees",
                referencedColumnNames: ["id"],
            }),
        )
    }
}
