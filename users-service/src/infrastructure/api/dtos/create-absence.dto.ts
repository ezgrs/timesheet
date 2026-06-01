import { AbsenceReason, absenceReasons } from "@/domain/enums/absence-reason.js"
import {
    IsDateString,
    IsEnum,
    IsISO8601,
    IsOptional,
    IsString,
    IsUUID,
} from "class-validator"

export class CreateAbsenceDTO {
    @IsString()
    @IsUUID()
    employeeId!: string

    @IsString()
    @IsISO8601({ strict: true })
    startDate!: Date

    @IsString()
    @IsISO8601({ strict: true })
    endDate!: Date

    @IsOptional()
    @IsString()
    @IsEnum(absenceReasons)
    reason: AbsenceReason | undefined
}
