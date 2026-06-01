import { AbsenceReason } from "@/domain/enums/absence-reason"

export type CreateAbsenceDTO = {
    employeeId: string
    startDate: Date
    endDate: Date
    reason?: AbsenceReason | undefined
}
