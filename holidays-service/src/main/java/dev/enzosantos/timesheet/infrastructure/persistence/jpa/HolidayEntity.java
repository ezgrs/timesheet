package dev.enzosantos.timesheet.infrastructure.persistence.jpa;

import java.time.LocalDate;

import dev.enzosantos.timesheet.domain.enums.HolidayScope;
import dev.enzosantos.timesheet.domain.enums.HolidayType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "holidays")
public class HolidayEntity {
    @Id
    @Column(name = "date")
    private LocalDate date;

    @Enumerated(EnumType.STRING)
    @Column(name = "scope", nullable = false)
    private HolidayScope scope;

    @Column(name = "name", nullable = false, length = 255)
    private String name;

    @Enumerated(EnumType.STRING)
    @Column(name = "type", nullable = false)
    private HolidayType type;

    public HolidayEntity() {}

    public HolidayEntity(LocalDate date, HolidayScope scope, String name, HolidayType type) {
        this.date = date;
        this.scope = scope;
        this.name = name;
        this.type = type;
    }

    public LocalDate getDate() { return date; }
    public void setDate(LocalDate date) { this.date = date; }

    public HolidayScope getScope() { return scope; }
    public void setScope(HolidayScope scope) { this.scope = scope; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public HolidayType getType() { return type; }
    public void setType(HolidayType type) { this.type = type; }
}