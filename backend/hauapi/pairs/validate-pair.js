/*jslint node:true */
(function () {
    "use strict";
    const objectIdRe = /^[0-9a-fA-F]{24}$/;

    function validateRequired(toCheck) {
        return toCheck.hasOwnProperty("userId")
            && toCheck.hasOwnProperty("dogId")
            && typeof toCheck["userId"] === "string"
            && typeof toCheck["dogId"] === "string"
            && objectIdRe.test(toCheck["userId"])
            && objectIdRe.test(toCheck["dogId"]);
    }

    exports.validateRequired = validateRequired;
}());