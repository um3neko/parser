import "reflect-metadata"
import { DataSource } from "typeorm"
import { User } from "./entity/User"
import { config } from 'dotenv';
import { ParseRequest } from "./entity/ParseRequests";
import { BlackListTokens } from "./entity/BlackListTokens";
config();

export const AppDataSource = new DataSource({
    type: "postgres",
    host: process.env.HOST,
    port: Number(process.env.DB_PORT),
    username: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
    synchronize: true,
    logging: false,
    entities: [User, ParseRequest, BlackListTokens],
    migrations: [],
    subscribers: [],
});
