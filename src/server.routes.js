import { Router } from "express";
import { authUser } from "./middlewares/authorization.js";
import { accountRoutes } from "./modules/account/account.routes.js";
import { errorHandler } from "./helpers/error.handler.js";

export const routes = Router();

routes.use(accountRoutes);

routes.get("/protected", authUser, (request, response) => {
    try {

        const { user } = request;

        return response.status(200).json({
            status: "success",
            statusMessage: "Protected page access successfully;",
            data: user,
        });

    } catch (error) { return errorHandler(response, 500, "Internal server error."); }
});