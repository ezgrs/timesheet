import {
    BaseEntity,
    Column,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn,
} from "typeorm"
import { EmployeeEntity } from "./EmployeeEntity"
import { AbsenceReasonEntity } from "./AbsenceReasonEntity"

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
        enum: AbsenceReasonEntity,
        nullable: true,
    })
    reason!: AbsenceReasonEntity | null
}
