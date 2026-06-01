import { HolidayShift, holidayShifts } from "@/domain/enums/holiday-shift.js"
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm"

@Entity({ name: "holidays" })
export class HolidayEntity extends BaseEntity {
    @PrimaryGeneratedColumn("uuid", { name: "id" })
    id!: string

    @Column({ name: "date", type: "date" })
    date!: Date

    @Column({ name: "name", type: "varchar", length: 255 })
    name!: string

    @Column({
        name: "shift",
        type: "enum",
        enum: holidayShifts,
        nullable: true,
    })
    shift!: HolidayShift | null
}
