import {
    BaseEntity,
    Column,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn,
} from "typeorm"
import { EmployeeEntity } from "./employee.entity"
import { AbsenceReason, absenceReasons } from "@/domain/enums/absence-reason"

@Entity({ name: "absences" })
export class AbsenceEntity extends BaseEntity {
    @PrimaryGeneratedColumn("uuid", { name: "id" })
    id!: string

    @Column({ name: "employeeid", type: "uuid" })
    employeeId!: string

    @ManyToOne(() => EmployeeEntity, (employee) => employee.absences)
    @JoinColumn({ name: "employeeid" })
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
