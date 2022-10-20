import { DataSource } from "typeorm";
import { ResUser } from '../entities/ResUser.entity';

export const AppDataSource = new DataSource({
    type: "mssql",
    host: process.env.HOST,
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    entities: [ResUser],
    logging: true,
    extra: {
        trustServerCertificate: true
    },
    synchronize: true
});