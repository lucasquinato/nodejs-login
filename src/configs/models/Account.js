import { DataTypes } from "sequelize";
import database from "../database.js";

export const Account = database.define("Account", {

    id: {
        type: DataTypes.INTEGER(),
        autoIncrement: true,
        primaryKey: true,
    },
    email: {
        type: DataTypes.STRING(),
        allowNull: false,
        unique: true,
    },
    username: {
        type: DataTypes.STRING(20),
        allowNull: false,
        unique: true,
    },
    password: {
        type: DataTypes.STRING(),
        allowNull: false,
    },

}, {
    tableName: "accounts",
    timestamps: false,
    hooks: {
        //
    }
});