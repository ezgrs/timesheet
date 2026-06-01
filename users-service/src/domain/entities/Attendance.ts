import { Absence } from "./Absence"
import { Employee } from "./Employee"

export type Attendance = {
    employee: Employee
    absences: Absence[]
}
