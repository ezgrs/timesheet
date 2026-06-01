import { AbsenceReason } from "../../../domain/enums/AbsenceReason"

export type CreateAbsenceDTO = {
    employeeId: string
    startDate: Date
    endDate: Date
    reason?: AbsenceReason | undefined
}