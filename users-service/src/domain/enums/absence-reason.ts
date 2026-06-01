export const absenceReasons = [
    "annualLeave",
    "sickLeave",
    "medicalLeave",
    "longServiceLeave",
] as const

export type AbsenceReason = (typeof absenceReasons)[number]
