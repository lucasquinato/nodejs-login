import jwt from "jsonwebtoken";
import { errorHandler } from "../helpers/error.handler.js";

export function authUser(request, response, next) {
    try {

        const { user_access } = request.cookies;

        if (!user_access) return errorHandler(response, 400, "No has provided token.");

        jwt.verify(user_access, process.env.JWT_SECRET_KEY, (err, decoded) => {

            if (err) return errorHandler(response, 400, "Token expired.");

            if (!decoded.user_id || !decoded.email || !decoded.username) return errorHandler(response, 400, "Token invalid.");

            request.user = {
                id: decoded.user_id,
                email: decoded.email,
                username: decoded.username,
            }

            next();

        });

    } catch (error) { return errorHandler(response, 500, "Internal server error."); }
}
