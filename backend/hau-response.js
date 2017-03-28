/*jslint node:true */
(function () {
    "use strict";

    function createOkResponse(data) {
        let response = {};
        response.data = data;
        response.status = 200;
        response.content = 'application/json';

        return response;
    }

    function createNotFoundResponse(what) {
        let errorMessage = {},
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
        let errorMessage = {},
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
        let response = {};

        response.status = 500;
        response.content = 'application/json';
        response.data = what;

        return response;
    }

    function createBadRequestResponse() {
        let response = {};

        response.status = 400;
        response.content = 'application/json';
        response.data = {};
        response.data.message = "Bad Request";

        return response;
    }

    function createAuthenticationErrorResponse() {
        let response = {};

        response.status = 401;
        response.content = 'application/json';
        response.data = {};
        response.data.message = "Authentication failed";

        return response;
    }

    function createUnauthorizedResponse() {
        let response = {};

        response.status = 403;
        response.content = 'application/json';
        response.data = {};
        response.data.message = "Unauthorized access";

        return response;
    }

    function createAuthenticationSucceededResponse(token) {
        let response = {};

        response.status = 200;
        response.content = 'application/json';
        response.data = {token: token};
        response.data.message = "Authentication succeeded";

        return response;
    }

    function sendResponse(res, data) {

        if (data.hasOwnProperty('status')) {
            res.status(data.status);
        }
        if (data.hasOwnProperty('content')) {
            res.setHeader('Content-Type', data.content);
        }
        res.send(data.data);
    }

    exports.createUnauthorizedResponse = createUnauthorizedResponse;
    exports.createAuthenticationErrorResponse = createAuthenticationErrorResponse;
    exports.createAuthenticationSucceededResponse = createAuthenticationSucceededResponse;
    exports.createOkResponse = createOkResponse;
    exports.createNotFoundResponse = createNotFoundResponse;
    exports.createFoundResponse = createFoundResponse;
    exports.createBadRequestResponse = createBadRequestResponse;
    exports.createErrorResponse = createErrorResponse;
    exports.sendResponse = sendResponse;
}());
