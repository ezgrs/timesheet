package dev.enzosantos.timesheet.application.usecases;

import java.util.List;

import dev.enzosantos.timesheet.application.ports.HolidayFetcher;
import dev.enzosantos.timesheet.application.ports.HolidayRepository;
import dev.enzosantos.timesheet.domain.entities.Holiday;

public class HolidaySynchronizer {
    private final HolidayRepository repository;
    private final HolidayFetcher fetcher;

    public HolidaySynchronizer(HolidayRepository repository, HolidayFetcher fetcher) {
        this.repository = repository;
        this.fetcher = fetcher;
    }

    void execute(int year) {
        final List<Holiday> holidays = fetcher.fetch(year);
        repository.removeByYear(year);
        repository.createAll(holidays);
    }
}
