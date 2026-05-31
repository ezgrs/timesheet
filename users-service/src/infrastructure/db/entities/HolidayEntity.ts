import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm"
import { HolidayShiftEntity } from "./HolidayShiftEntity"

@Entity({name: "holidays"})
export class HolidayEntity extends BaseEntity {
    @PrimaryGeneratedColumn("increment", {name: "id", type: "int"})
    id!: number

    @Column({name: "date", type: "date"})
    date!: string

    @Column({name: "name", type: "varchar", length: 255})
    name!: string

    @Column({name: "shift", type: "enum", enum: HolidayShiftEntity, nullable: true})
    shift!: HolidayShiftEntity | null
}
