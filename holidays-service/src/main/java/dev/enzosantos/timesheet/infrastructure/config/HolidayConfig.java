package dev.enzosantos.timesheet.infrastructure.config;

import java.util.Optional;

import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.client.RestTemplate;

import dev.enzosantos.timesheet.application.ports.HolidayFetcher;
import dev.enzosantos.timesheet.application.ports.HolidayStore;
import dev.enzosantos.timesheet.application.usecases.HolidayLoader;
import dev.enzosantos.timesheet.application.usecases.HolidaySynchronizer;
import dev.enzosantos.timesheet.infrastructure.external.InvertextoHolidayFetcher;
import dev.enzosantos.timesheet.infrastructure.persistence.adapter.JpaHolidayStore;
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
    HolidayStore store(HolidayJpaRepository jpaRepository) {
        return new JpaHolidayStore(jpaRepository);
    }

    @Bean
    HolidayLoader loader(HolidayStore store, HolidayFetcher fetcher) {
        return new HolidayLoader(store, fetcher);
    }

    @Bean
    HolidaySynchronizer synchronizer(HolidayStore store, HolidayFetcher fetcher) {
        return new HolidaySynchronizer(store, fetcher);
    }
}