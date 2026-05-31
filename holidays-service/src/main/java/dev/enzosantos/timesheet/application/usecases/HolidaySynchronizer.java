package dev.enzosantos.timesheet.application.usecases;

import java.util.List;

import dev.enzosantos.timesheet.application.ports.HolidayFetcher;
import dev.enzosantos.timesheet.application.ports.HolidayStore;
import dev.enzosantos.timesheet.domain.entities.Holiday;

public class HolidaySynchronizer {
    private final HolidayStore store;
    private final HolidayFetcher fetcher;

    public HolidaySynchronizer(HolidayStore store, HolidayFetcher fetcher) {
        this.store = store;
        this.fetcher = fetcher;
    }

    public void execute(int year) {
        final List<Holiday> holidays = fetcher.fetch(year);
        store.removeByYear(year);
        store.createAll(holidays);
    }
}
