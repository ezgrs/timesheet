package dev.enzosantos.timesheet.application.ports;


import java.util.List;

import dev.enzosantos.timesheet.domain.entities.Holiday;

public interface HolidayRepository {
    List<Holiday> readByMonth(int year, int month);
    void removeByYear(int year);
    void createAll(List<Holiday> holidays);
}
