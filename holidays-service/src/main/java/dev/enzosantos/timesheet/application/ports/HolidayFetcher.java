package dev.enzosantos.timesheet.application.ports;

import java.util.List;

import dev.enzosantos.timesheet.domain.entities.Holiday;

public interface HolidayFetcher {
    List<Holiday> fetch(int year);
}
