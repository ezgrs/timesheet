package dev.enzosantos.timesheet.infrastructure.web.mapper;

import dev.enzosantos.timesheet.domain.entities.Holiday;
import dev.enzosantos.timesheet.infrastructure.web.dto.HolidayDTO;

public class HolidayDTOMapper {
    public static HolidayDTO toDTO(Holiday domain) {
        return new HolidayDTO(domain.date(), domain.name(), domain.type(), domain.scope());
    }

    public static Holiday toDomain(HolidayDTO dto) {
        return new Holiday(dto.date(), dto.name(), dto.type(), dto.scope());
    }
}
