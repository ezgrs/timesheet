import "reflect-metadata"
import "dotenv/config"
import { DataSource } from "typeorm"

export default new DataSource({
    type: "postgres",
    host: process.env.DATABASE_HOST,
    port: parseInt(process.env.DATABASE_PORT!),
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,

    entities: ["src/infrastructure/db/entities/*Entity.ts"],
    migrations: ["src/infrastructure/db/migrations/*.ts"],
})
