package dev.enzosantos.timesheet.application.usecases;

import java.util.List;
import java.util.stream.Collectors;

import dev.enzosantos.timesheet.application.ports.HolidayFetcher;
import dev.enzosantos.timesheet.application.ports.HolidayRepository;
import dev.enzosantos.timesheet.domain.entities.Holiday;

public class HolidayLoader {
    private final HolidayRepository repository;
    private final HolidayFetcher fetcher;

    public HolidayLoader(HolidayRepository repository, HolidayFetcher fetcher) {
        this.repository = repository;
        this.fetcher = fetcher;
    }

    List<Holiday> execute(int year, int month) {
        final List<Holiday> holidays = repository.readByMonth(year, month);
        if (!holidays.isEmpty()) return holidays;
        final List<Holiday> yearHolidays = fetcher.fetch(year);
        repository.createAll(yearHolidays);
        return yearHolidays
            .stream()
            .filter(holiday -> holiday.date().getYear() == year && holiday.date().getMonthValue() == month)
            .collect(Collectors.toList());
    }
}
