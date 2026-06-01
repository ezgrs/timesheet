import { Absence } from "@/domain/entities/absence"
import { Employee } from "@/domain/entities/employee"

export type Attendance = {
    employee: Employee
    absences: Absence[]
}
