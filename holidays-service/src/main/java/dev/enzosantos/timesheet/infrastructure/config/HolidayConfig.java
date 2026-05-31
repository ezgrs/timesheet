package dev.enzosantos.timesheet.infrastructure.config;

import java.util.Optional;

import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.client.RestTemplate;

import dev.enzosantos.timesheet.application.ports.HolidayFetcher;
import dev.enzosantos.timesheet.application.ports.HolidayRepository;
import dev.enzosantos.timesheet.application.usecases.HolidayLoader;
import dev.enzosantos.timesheet.application.usecases.HolidaySynchronizer;
import dev.enzosantos.timesheet.infrastructure.external.InvertextoHolidayFetcher;
import dev.enzosantos.timesheet.infrastructure.persistence.adapter.JpaHolidayRepository;
import dev.enzosantos.timesheet.infrastructure.persistence.repository.HolidayJpaRepository;

@Configuration
@EnableConfigurationProperties(InvertextoProperties.class)
class HolidayConfig {
    @Bean
    RestTemplate restTemplate() {
        return new RestTemplate();
    }

    @Bean
    HolidayFetcher fetcher(RestTemplate restTemplate, InvertextoProperties properties) {
        return new InvertextoHolidayFetcher(restTemplate, properties.getToken(), Optional.of(properties.getState()));
    }

    @Bean
    HolidayRepository repository(HolidayJpaRepository jpaRepository) {
        return new JpaHolidayRepository(jpaRepository);
    }

    @Bean
    HolidayLoader loader(HolidayRepository repository, HolidayFetcher fetcher) {
        return new HolidayLoader(repository, fetcher);
    }

    @Bean
    HolidaySynchronizer synchronizer(HolidayRepository repository, HolidayFetcher fetcher) {
        return new HolidaySynchronizer(repository, fetcher);
    }
}