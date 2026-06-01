import { Absence } from "@/domain/entities/absence.js"
import { Employee } from "@/domain/entities/employee.js"

export type Attendance = {
    employee: Employee
    absences: Absence[]
}
