'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var errorHandlerInstance = null;
/**
 * Class for error handling
 */

var ErrorHandler = function () {
    /**
     * Create only one instance of error handler
     */
    function ErrorHandler() {
        _classCallCheck(this, ErrorHandler);

        if (!errorHandlerInstance) {
            errorHandlerInstance = this;
        }

        return errorHandlerInstance;
    }

    /**
     * Convert error message to understandable value and show an alert with explanation
     * @param {object} error - Error object with info
     */


    _createClass(ErrorHandler, [{
        key: 'handleError',
        value: function handleError(error) {
            var message = void 0;

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

                alert(message);
            }
        }
    }]);

    return ErrorHandler;
}();