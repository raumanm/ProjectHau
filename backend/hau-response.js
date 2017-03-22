/*jslint node:true */
(function () {
    "use strict";

    function createOkResponse(data) {
        var response = {};
        response.data = data;
        response.status = 200;
        response.content = 'application/json';

        return response;
    }

    function createNotFoundResponse(what) {
        var errorMessage = {},
            response = {};

        errorMessage.code = 404;
        errorMessage.message = "Resource not found.";
        errorMessage.description = "The resource with id = "
        + what + " does not exist.";

        response.status = 404;
        response.content = 'application/json';
        response.data = errorMessage;

        return response;
    }

    function createFoundResponse(what) {
        var errorMessage = {},
            response = {};

        errorMessage.code = 409;
        errorMessage.message = "Resource with same name found in conflict.";
        errorMessage.description = "The resource with username = "
        + what + " already exists.";

        response.status = 409;
        response.content = 'application/json';
        response.data = errorMessage;

        return response;
    }

    function createErrorResponse(what) {
        var response = {};

        response.status = 500;
        response.content = 'application/json';
        response.data = what;

        return response;
    }

    function createBadRequestResponse() {
        var response = {};

        response.status = 400;
        response.content = 'application/json';
        response.data = {};
        response.data.message = "Bad Request";

        return response;
    }

    exports.createOkResponse = createOkResponse;
    exports.createNotFoundResponse = createNotFoundResponse;
    exports.createFoundResponse = createFoundResponse;
    exports.createBadRequestResponse = createBadRequestResponse;
    exports.createErrorResponse = createErrorResponse;
}());
