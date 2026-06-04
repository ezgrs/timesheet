import { z } from "zod"
import { absenceReasons } from "../../domain/enums/absence-reason"

export const ReadAbsencesDTOSchema = z.object({
    employee: z.object({
        id: z.uuid(),
        name: z.string(),
        code: z.string(),
        role: z.string(),
    }),
    absences: z.array(z.object({
        id: z.uuid(),
        employeeId: z.uuid(),
        startDate: z.iso.date(),
        endDate: z.iso.date(),
        reason: z.enum(absenceReasons).optional(),
    })),
})

export type ReadAbsencesDTO = z.infer<typeof ReadAbsencesDTOSchema>