package dev.enzosantos.timesheet.infrastructure.external;

import java.time.LocalDate;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

import dev.enzosantos.timesheet.application.ports.HolidayFetcher;
import dev.enzosantos.timesheet.domain.entities.Holiday;
import dev.enzosantos.timesheet.domain.enums.HolidayScope;
import dev.enzosantos.timesheet.domain.enums.HolidayType;

final record InvertextoHolidayDTO(
        String date,
        String name,
        String type,
        String level,
        String law) {
}

public class InvertextoHolidayFetcher implements HolidayFetcher {
    private final RestTemplate restTemplate;
    private final String token;
    private final Optional<String> maybeState;

    public InvertextoHolidayFetcher(RestTemplate restTemplate, String token, Optional<String> state) {
        this.restTemplate = restTemplate;
        this.token = token;
        this.maybeState = state;
    }

    @Override
    public List<Holiday> fetch(int year) {
        UriComponentsBuilder builder = UriComponentsBuilder
                .fromUriString("https://api.invertexto.com")
                .path("/v1/holidays")
                .queryParam("token", token);
        final String url = maybeState.map(state -> builder.queryParam("state", state)).orElse(builder).build()
                .toUriString();

        InvertextoHolidayDTO[] response;
        try {
            response = restTemplate.getForObject(url, InvertextoHolidayDTO[].class);
        } catch (Exception e) {
            throw new RuntimeException("External API error: " + e.getMessage());
        }
        if (response == null) {
            return List.of();
        }
        return Arrays.stream(response)
                .map(holiday -> {
                    final LocalDate date = LocalDate.parse(holiday.date());
                    final HolidayType type;
                    switch (holiday.type()) {
                        case "feriado":
                            type = HolidayType.required;
                            break;
                        case "facultativo":
                            type = HolidayType.optional;
                            break;
                        default:
                            throw new RuntimeException(
                                    "External API error: unexpected holiday type (" + holiday.type() + ")");
                    }
                    final HolidayScope scope;
                    switch (holiday.level()) {
                        case "nacional":
                            scope = HolidayScope.country;
                            break;
                        case "estadual":
                            scope = HolidayScope.state;
                            break;
                        default:
                            throw new RuntimeException(
                                    "External API error: unexpected holiday scope (" + holiday.level() + ")");
                    }
                    return new Holiday(date, holiday.name(), type, scope);
                })
                .toList();
    }
}
