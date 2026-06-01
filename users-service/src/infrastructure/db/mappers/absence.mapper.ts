import { Absence } from "../../../domain/entities/absence"
import { AbsenceEntity } from "../entities/absence.entity"
import { AbsenceReasonEntity } from "../entities/absence-reason.entity"

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
        entity.reason =
            domain.reason == null
                ? null
                : {
                      annualLeave: AbsenceReasonEntity.annualLeave,
                      sickLeave: AbsenceReasonEntity.sickLeave,
                      medicalLeave: AbsenceReasonEntity.medicalLeave,
                      longServiceLeave: AbsenceReasonEntity.longServiceLeave,
                  }[domain.reason]
        return entity
    }
}
