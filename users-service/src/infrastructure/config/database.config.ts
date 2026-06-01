import { TypeOrmModuleOptions } from "@nestjs/typeorm"
import "dotenv/config"

export const databaseConfig: TypeOrmModuleOptions = {
    type: "postgres",
    host: process.env.DATABASE_HOST,
    port: parseInt(process.env.DATABASE_PORT!),
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
    entities: ["src/infrastructure/db/entities/*.entity.ts"],
    migrations: ["src/infrastructure/db/migrations/*.ts"],
} as const
