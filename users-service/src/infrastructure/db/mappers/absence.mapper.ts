import { Absence } from "@/domain/entities/absence.js"
import { AbsenceEntity } from "../entities/absence.entity.js"

export namespace AbsenceMapper {
    export function toDomain(entity: AbsenceEntity): Absence {
        return {
            id: entity.id,
            employeeId: entity.employee.id,
            startDate: entity.startDate,
            endDate: entity.endDate,
            reason: entity.reason,
        }
    }

    export function toEntity(domain: Absence): AbsenceEntity {
        const entity = new AbsenceEntity()
        entity.id = domain.id
        entity.employeeId = domain.employeeId
        entity.startDate = domain.startDate
        entity.endDate = domain.endDate
        entity.reason = domain.reason
        return entity
    }
}
