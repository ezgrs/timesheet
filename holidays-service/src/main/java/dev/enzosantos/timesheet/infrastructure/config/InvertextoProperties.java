package dev.enzosantos.timesheet.infrastructure.config;

import org.springframework.boot.context.properties.ConfigurationProperties;

@ConfigurationProperties(prefix = "invertexto")
public class InvertextoProperties {
    private String token;
    private String state;

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public String getState() {
        return state;
    }

    public void setState(String state) {
        this.state = state;
    }
}