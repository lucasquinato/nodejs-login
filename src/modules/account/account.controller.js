import bcrypt from "bcryptjs";
import { createToken } from "../../configs/token.js";
import { Account } from "../../configs/models/Account.js";
import { errorHandler } from "../../helpers/error.handler.js";

export async function signUp(request, response) {
    try {

        const { email, username, password } = request.body;

        const createNewAccount = await Account.create({ email, username, password });

        return response.status(201).json({
            status: "success",
            statusMessage: "New account has been created succesfully.",
            data: {
                user_id: createNewAccount.id,
                username: createNewAccount.username,
            },
        });

    } catch (error) { return errorHandler(response, 500, { server: error.message }); }
}

export async function logIn(request, response) {
    try {

        const { user, password, loginType } = request.body;

        let getAccount;
        if (loginType === "email") { getAccount = await Account.findOne({ where: { email: user } }); }
        if (loginType === "username") { getAccount = await Account.findOne({ where: { username: user } }); }

        if (getAccount) {

            const getPassword = await bcrypt.compare(password, getAccount.password);
            if (getPassword) {

                const { token } = createToken({
                    user_id: getAccount.id,
                    email: getAccount.email,
                    username: getAccount.username,
                });

                return response.status(200).cookie("user_access", token, {
                    maxAge: 60 * 1000,
                    httpOnly: true,
                    // secure: true,
                }).json({
                    status: "success",
                    statusMessage: "User logged in successfully.",
                    data: { name: getAccount.username, token },
                });

            }

        }

        return errorHandler(response, 400, "User or password incorrect.");

    } catch (error) { return errorHandler(response, 500, { server: error.message }); }
}
