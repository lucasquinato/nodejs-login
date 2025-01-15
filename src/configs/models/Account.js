import { DataTypes } from "sequelize";
import database from "../database.js";
import bcrypt from "bcryptjs";

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

        async beforeCreate(acc) {
            const emailDuplicity = await Account.findOne({ where: { email: acc.email } });
            if (emailDuplicity) throw new Error("Email already in use!");
            
            const usernameDuplicity = await Account.findOne({ where: { username: acc.username } });
            if (usernameDuplicity) throw new Error("Username already in use!");

            const getSalts = await bcrypt.genSalt(12);
            const getHash = await bcrypt.hash(acc.password, getSalts);
            acc.password = getHash;
        }

    }
});