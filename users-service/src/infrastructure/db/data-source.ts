import { DataSource } from "typeorm"
import { databaseConfig } from "../config/database.config.js"

export default new DataSource(databaseConfig as any)
