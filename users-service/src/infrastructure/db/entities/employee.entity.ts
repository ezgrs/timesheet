import {
    Column,
    Entity,
    OneToMany,
    PrimaryGeneratedColumn,
} from "typeorm"
import { AbsenceEntity } from "./absence.entity.js"

@Entity({ name: "employees" })
export class EmployeeEntity {
    @PrimaryGeneratedColumn("uuid", { name: "id" })
    id!: string

    @Column({ name: "name", type: "varchar", length: 255 })
    name!: string

    @Column({ name: "code", type: "char", length: 11 })
    code!: string

    @Column({ name: "role", type: "varchar" })
    role!: string

    @OneToMany(() => AbsenceEntity, (absence) => absence.employee)
    absences!: AbsenceEntity[]
}
