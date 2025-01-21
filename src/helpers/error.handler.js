export function errorHandler(response, status, message, data) {
    if (typeof message === "string") {
        /**
         * Response with data
         * 
         * data: errors or user info.
         */
        if (data) {
            return response.status(status).json({
                status: "error",
                statusMessage: message,
                data,
            });
        }
        /**
         * Default response
         */
        return response.status(status).json({
            status: "error",
            statusMessage: message,
        });
    }

    if (typeof message === "object") {
        /**
         * Response for conflict
         */
        if (message?.server === "Email already in use!" ||
            message?.server === "Username already in use!") {

            return response.status(409).json({
                status: "error",
                statusMessage: message?.server,
            });
        }
        /**
         * Default response
         */
        if (message?.server) {
            return response.status(status).json({
                status: "error",
                statusMessage: message?.server,
            });
        }
    }
}

export function configureValidationErrors(error) {
    return error.details.reduce((acc, error) => {
        const field = error.path[0];
        if (!acc[field]) acc[field] = { errors: [] };
        acc[field].errors.push(error.message);
        return acc;
    }, {});
}