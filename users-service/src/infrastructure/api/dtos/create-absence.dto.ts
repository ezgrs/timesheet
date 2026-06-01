import { AbsenceReason } from "@/domain/enums/absence-reason.js"

export type CreateAbsenceDTO = {
    employeeId: string
    startDate: Date
    endDate: Date
    reason?: AbsenceReason | undefined
}
