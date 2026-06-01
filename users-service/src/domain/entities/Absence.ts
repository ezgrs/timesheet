import { AbsenceReason } from "../enums/absence-reason"

export type Absence = {
    id: string
    employeeId: string
    startDate: Date
    endDate: Date
    reason: AbsenceReason | null
}
