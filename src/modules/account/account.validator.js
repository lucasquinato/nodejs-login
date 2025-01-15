import Joi from "joi";

export const email = Joi.string().email({ tlds: { allow: true } }).required();

export const username = Joi.string().pattern(/^[a-z0-9]+$/).min(4).max(20).required();

export const password = Joi.string().pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{6,15}$/).min(6).max(15).required();

export function signUpValidator(request, response, next) {

    const configSignUpSchema = Joi.object({ email, username, password });

    const { error } = configSignUpSchema.validate(request.body, { allowUnknown: false, abortEarly: false });

    if (error) {
        //
    }

    next();
}