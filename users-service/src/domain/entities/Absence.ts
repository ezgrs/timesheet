import { AbsenceReason } from "@/domain/enums/absence-reason.js"

export type Absence = {
    id: string
    employeeId: string
    startDate: Date
    endDate: Date
    reason: AbsenceReason | null
}
