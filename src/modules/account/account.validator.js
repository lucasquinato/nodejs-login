import Joi from "joi";
import {
    errorHandler,
    configureValidationErrors } from "../../helpers/error.handler.js";

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
            if (error.details.some(err => err.type === "object.unknown")) {
                return errorHandler(response, 401, "Invalid parameters in the body request. Verify the documentation to continue.");
            }

            const configuredErrors = configureValidationErrors(error);
            return errorHandler(response, 400, "Invalid field in the body request.", configuredErrors);
        }

        next();

    } catch (error) { return errorHandler(response, 500, "Internal server error."); }
}

export function logInValidator(request, response, next) {
    try {
        const configLogInSchema = Joi.object({
            user: Joi.alternatives().try(email, username).required().messages({
                "alternatives.match": "The field must contain a valid email or username.",
                "any.required": "User is required.",
            }),
            password,
        });

        const { error, value } = configLogInSchema.validate(request.body, { allowUnknown: false, abortEarly: false });

        if (error) {
            if (error.details.some(err => err.type === "object.unknown")) {
                return errorHandler(response, 401, "Invalid parameters in the body request. Verify the documentation to continue.");
            }

            const configuredErrors = configureValidationErrors(error);
            return errorHandler(response, 400, "Invalid field in the body request.", configuredErrors);
        }

        if (email.validate(value.user).error === undefined) {
            request.body.loginType = "email";
        } else if (username.validate(value.user).error === undefined) {
            request.body.loginType = "username";
        }

        next();

    } catch (error) { return errorHandler(response, 500, "Internal server error."); }
}
