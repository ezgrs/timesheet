package dev.enzosantos.timesheet.infrastructure.web.dto;

import java.time.LocalDate;

import dev.enzosantos.timesheet.domain.enums.HolidayScope;
import dev.enzosantos.timesheet.domain.enums.HolidayType;

public record HolidayDTO(
    LocalDate date,
    String name,
    HolidayType type,
    HolidayScope scope
) {}
