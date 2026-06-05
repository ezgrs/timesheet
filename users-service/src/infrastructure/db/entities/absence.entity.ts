import {
    Column,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn,
} from "typeorm"
import { EmployeeEntity } from "./employee.entity.js"
import { AbsenceReason, absenceReasons } from "@/domain/enums/absence-reason.js"

@Entity({ name: "absences" })
export class AbsenceEntity {
    @PrimaryGeneratedColumn("uuid", { name: "id" })
    id!: string

    @Column({ name: "employeeid", type: "uuid" })
    employeeId!: string

    @ManyToOne(() => EmployeeEntity, (employee) => employee.absences, {onDelete: "CASCADE"})
    @JoinColumn({
        name: "employeeid",
        foreignKeyConstraintName: "FK_absences_employeeid",
    })
    employee!: EmployeeEntity

    @Column({ name: "startdate", type: "date" })
    startDate!: Date

    @Column({ name: "enddate", type: "date" })
    endDate!: Date

    @Column({
        name: "reason",
        type: "enum",
        enum: absenceReasons,
        nullable: true,
    })
    reason!: AbsenceReason | null
}
