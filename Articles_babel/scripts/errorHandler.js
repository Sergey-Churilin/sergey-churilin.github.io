let errorHandlerInstance = null;
/**
 * Class for error handling
 */
class ErrorHandler {
    /**
     * Create only one instance of error handler
     */
    constructor() {
        if (!errorHandlerInstance) {
            errorHandlerInstance = this;
        }

        return errorHandlerInstance;
    }

    /**
     * Convert error message to understandable value and show an alert with explanation
     * @param {object} error - Error object with info
     */
    handleError(error) {
        let message;

        if (error && error.message) {
            message = error.message;
        }

        if (message) {
            arrayEndpoints.forEach(function (endpoint) {
                if (message.indexOf(endpoint.path) > -1) {
                    message = message.replace('/', '');
                    message = message.replace(endpoint.path, endpoint.text.toUpperCase());
                }
            });

            alert(message)
        }
    }
}