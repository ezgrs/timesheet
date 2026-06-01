import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm"
import { HolidayShiftEntity } from "./HolidayShiftEntity"

@Entity({name: "holidays"})
export class HolidayEntity extends BaseEntity {
    @PrimaryGeneratedColumn("uuid", {name: "id"})
    id!: string

    @Column({name: "date", type: "date"})
    date!: string

    @Column({name: "name", type: "varchar", length: 255})
    name!: string

    @Column({name: "shift", type: "enum", enum: HolidayShiftEntity, nullable: true})
    shift!: HolidayShiftEntity | null
}
