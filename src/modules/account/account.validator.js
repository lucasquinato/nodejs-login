import { errorHandler } from "../../helpers/error.handler.js";
import Joi from "joi";

export const email = Joi.string().email({ tlds: { allow: true } }).required().messages({
    // Email messages

    "string.base": "Must be a string.",
    "string.email": "Must be a valid email.",
    "string.empty": "Is required.",
    "any.required": "Is required.",
});

export const username = Joi.string().pattern(/^[a-z0-9]+$/).min(4).max(20).required().messages({
    // Username messages

    "string.min": "min is 4 characters.",
    "string.max": "max is 20 characters.",
    "string.base": "Must be a string.",
    "string.empty": "Is required.",
    "any.required": "Is required.",

    "string.pattern.base": "Is accepted only lowercase letters and numbers.",
});

export const password = Joi.string().pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{6,15}$/).min(6).max(15).required().messages({
    // Password messages

    "string.min": "min is 6 characters.",
    "string.max": "max is 15 characters.",
    "string.base": "Must be a string.",
    "string.empty": "Is required.",
    "any.required": "Is required.",

    "string.pattern.base": "Is required lowercase and uppercase letters and numbers.",
});

export function signUpValidator(request, response, next) {
    try {
        const configSignUpSchema = Joi.object({ email, username, password });

        const { error } = configSignUpSchema.validate(request.body, { allowUnknown: false, abortEarly: false });

        if (error) {
            console.log(error);
            if (error.details.some(err => err.type === "object.unknown")) {
                return errorHandler(response, 401, "Invalid parameters in the body request. Verify the documentation to continue.");
            }

            const configureErrors = error.details.reduce((acc, error) => {
                const fields = error.path[0];
                if (!acc[fields]) acc[fields] = { errors: [] };

                acc[fields].errors.push(error.message);
                return acc;
            }, {});

            return errorHandler(response, 400, "Invalid field in the body request.", configureErrors);
        }

        next();

    } catch (error) { return errorHandler(response, 500, "Internal server error."); }
}