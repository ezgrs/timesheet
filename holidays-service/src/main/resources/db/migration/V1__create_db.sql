-- V1__create_db.sql

CREATE TABLE holidays (
    date DATE PRIMARY KEY,
    scope TEXT NOT NULL CHECK (scope IN ('state', 'country')),
    name VARCHAR(255) NOT NULL,
    type TEXT NOT NULL CHECK (type IN ('required', 'optional'))
);
