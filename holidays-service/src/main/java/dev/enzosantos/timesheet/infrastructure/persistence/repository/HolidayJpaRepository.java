package dev.enzosantos.timesheet.infrastructure.persistence.repository;

import java.time.LocalDate;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.transaction.annotation.Transactional;

import dev.enzosantos.timesheet.infrastructure.persistence.jpa.HolidayEntity;

public interface HolidayJpaRepository
        extends JpaRepository<HolidayEntity, LocalDate> {

    List<HolidayEntity> findByDateBetween(LocalDate start, LocalDate end);

    @Transactional
    void deleteByDateBetween(LocalDate start, LocalDate end);

    boolean existsByDateBetween(LocalDate start, LocalDate end);
}