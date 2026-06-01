import { AbsenceReason } from "../enums/AbsenceReason"

export type Absence = {
    id: string
    employeeId: string
    startDate: Date
    endDate: Date
    reason: AbsenceReason | null
}
