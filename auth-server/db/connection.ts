import { DataSource } from "typeorm";

export const AppDataSource = new DataSource({
    type: "mssql",
    host: process.env.HOST,
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    entities: [],
    logging: true,
    extra: {
        trustServerCertificate: true
    }
    // synchronize: true
});