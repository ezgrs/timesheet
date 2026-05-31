package dev.enzosantos.timesheet.domain.entities;

import java.time.LocalDate;

import dev.enzosantos.timesheet.domain.enums.HolidayScope;
import dev.enzosantos.timesheet.domain.enums.HolidayType;

public record Holiday(
    LocalDate date,
    String name,
    HolidayType type,
    HolidayScope scope
) {}
