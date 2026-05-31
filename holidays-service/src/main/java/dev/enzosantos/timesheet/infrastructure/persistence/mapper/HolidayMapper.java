package dev.enzosantos.timesheet.infrastructure.persistence.mapper;

import dev.enzosantos.timesheet.domain.entities.Holiday;
import dev.enzosantos.timesheet.infrastructure.persistence.jpa.HolidayEntity;

public class HolidayMapper {
    public static HolidayEntity toEntity(Holiday domain) {
        HolidayEntity entity = new HolidayEntity();
        entity.setDate(domain.date());
        entity.setScope(domain.scope());
        entity.setName(domain.name());
        entity.setType(domain.type());
        return entity;
    }

    public static Holiday toDomain(HolidayEntity entity) {
        return new Holiday(entity.getDate(), entity.getName(), entity.getType(), entity.getScope());
    }
}
