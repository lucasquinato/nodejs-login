import { Sequelize } from "sequelize";

export default new Sequelize(
    // Credentials
    process.env.DATABASE_SCHEMA,
    process.env.DATABASE_USERNAME,
    process.env.DATABASE_PASSWORD, {
        // Configs
        dialect: "mysql",
        host: process.env.DATABASE_HOSTNAME,
        port: Number(process.env.DATABASE_PORT),
    },
);