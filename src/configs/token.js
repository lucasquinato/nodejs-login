import jwt from "jsonwebtoken";

export function createToken(payload) {
    const token = jwt.sign(
        payload, process.env.JWT_SECRET_KEY, {
            expiresIn: "1m"
        }
    );

    return { token }
}