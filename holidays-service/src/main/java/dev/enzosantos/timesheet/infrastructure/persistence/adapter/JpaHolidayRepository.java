package dev.enzosantos.timesheet.infrastructure.persistence.adapter;

import java.util.List;

import dev.enzosantos.timesheet.application.ports.HolidayRepository;
import dev.enzosantos.timesheet.domain.entities.Holiday;
import dev.enzosantos.timesheet.infrastructure.persistence.mapper.HolidayEntityMapper;
import dev.enzosantos.timesheet.infrastructure.persistence.repository.HolidayJpaRepository;

public class JpaHolidayRepository implements HolidayRepository {
    private final HolidayJpaRepository jpaRepository;

    public JpaHolidayRepository(HolidayJpaRepository jpaRepository) {
        this.jpaRepository = jpaRepository;
    }

    @Override
    public List<Holiday> readByMonth(int year, int month) {
        return jpaRepository.findByYearAndMonth(year, month).stream().map(HolidayEntityMapper::toDomain).toList();
    }

    @Override
    public void removeByYear(int year) {
        jpaRepository.deleteByYear(year);
    }

    @Override
    public void createAll(List<Holiday> holidays) {
        jpaRepository.saveAll(holidays.stream().map(HolidayEntityMapper::toEntity).toList());
    }
}