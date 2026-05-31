import { AbsenceReason } from "../enums/AbsenceReason"

export type Absence = {
    id: number
    employeeId: number
    startDate: Date
    endDate: Date
    reason: AbsenceReason | null
}
