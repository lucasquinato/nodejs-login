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

}
