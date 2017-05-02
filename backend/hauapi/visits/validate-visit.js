/*jslint node:true */
(function () {
    "use strict";
    const objectIdRe = /^[0-9a-fA-F]{24}$/;

    function validateRequired(toCheck) {
        return toCheck.hasOwnProperty("visitTime")
            && toCheck.hasOwnProperty("placeId")
            && typeof toCheck["placeId"] === "string"
            && Object.prototype.toString.call(toCheck["visitTime"]) === '[object Date]'
            && objectIdRe.test(toCheck["placeId"]);
    }

    function validateOptionals(toCheck) {
        if (toCheck.hasOwnProperty('assignedPairs') && typeof toCheck.assignedPairs !== "object") {
            return false;
        } else if (toCheck.hasOwnProperty('assignedPairs')) {
            if (!Array.isArray(toCheck.assignedPairs)) {
                return false;
            }
        }

        if (toCheck.hasOwnProperty('details') && typeof toCheck.details !== "string") {
            return false;
        }

        return true;
    }

    function pruneExcessive(toPrune) {
        let pruned = {};

        (toPrune.hasOwnProperty('visitTime')) ? pruned.visitTime = new Date(toPrune.visitTime) : undefined;
        (toPrune.hasOwnProperty('placeId')) ? pruned.placeId = toPrune.placeId : undefined;
        (toPrune.hasOwnProperty('assignedPairs')) ? pruned.assignedPairs = toPrune.assignedPairs : undefined;
        (toPrune.hasOwnProperty('details')) ? pruned.details = toPrune.details : undefined;

        return pruned;
    }

    exports.validateRequired = validateRequired;
    exports.validateOptionals = validateOptionals;
    exports.pruneExcessive = pruneExcessive;
}());
