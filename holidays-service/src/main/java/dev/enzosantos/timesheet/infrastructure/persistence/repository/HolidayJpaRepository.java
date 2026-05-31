package dev.enzosantos.timesheet.infrastructure.persistence.repository;

import java.time.LocalDate;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.transaction.annotation.Transactional;

import dev.enzosantos.timesheet.infrastructure.persistence.jpa.HolidayEntity;

public interface HolidayJpaRepository
        extends JpaRepository<HolidayEntity, LocalDate> {

    @Query("SELECT h FROM HolidayEntity h WHERE YEAR(h.date) = :year AND MONTH(h.date) = :month")
    List<HolidayEntity> findByYearAndMonth(int year, int month);

    @Transactional
    void deleteByDateBetween(LocalDate start, LocalDate end);

    boolean existsByDateBetween(LocalDate start, LocalDate end);
}