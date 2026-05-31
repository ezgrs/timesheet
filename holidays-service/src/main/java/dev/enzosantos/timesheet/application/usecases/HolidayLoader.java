package dev.enzosantos.timesheet.application.usecases;

import java.util.List;
import java.util.stream.Collectors;

import dev.enzosantos.timesheet.application.ports.HolidayFetcher;
import dev.enzosantos.timesheet.application.ports.HolidayStore;
import dev.enzosantos.timesheet.domain.entities.Holiday;

public class HolidayLoader {
    private final HolidayStore store;
    private final HolidayFetcher fetcher;

    public HolidayLoader(HolidayStore store, HolidayFetcher fetcher) {
        this.store = store;
        this.fetcher = fetcher;
    }

    public List<Holiday> execute(int year, int month) {
        if (store.existsAnyByYear(year)) {
            return store.readByMonth(year, month);
        }
        final List<Holiday> yearHolidays = fetcher.fetch(year);
        store.createAll(yearHolidays);
        return yearHolidays
                .stream()
                .filter(holiday -> holiday.date().getYear() == year && holiday.date().getMonthValue() == month)
                .collect(Collectors.toList());
    }
}
