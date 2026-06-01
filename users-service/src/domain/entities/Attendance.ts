import { Absence } from "./absence"
import { Employee } from "./employee"

export type Attendance = {
    employee: Employee
    absences: Absence[]
}
