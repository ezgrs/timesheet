import { Holiday } from "../../../domain/entities/holiday"
import { HolidayEntity } from "../entities/holiday.entity"
import { HolidayShiftEntity } from "../entities/holiday-shift.entity"

export namespace HolidayMapper {
    export function toDomain(entity: HolidayEntity): Holiday {
        return {
            id: entity.id,
            name: entity.name,
            date: entity.date,
            shift: entity.shift,
        }
    }

    export function toEntity(domain: Holiday): HolidayEntity {
        const entity = new HolidayEntity()
        entity.id = domain.id
        entity.name = domain.name
        entity.date = domain.date
        entity.shift =
            domain.shift == null
                ? null
                : {
                      am: HolidayShiftEntity.am,
                      pm: HolidayShiftEntity.pm,
                  }[domain.shift]
        return entity
    }
}
