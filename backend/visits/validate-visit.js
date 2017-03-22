/*jslint node:true */
(function () {
    "use strict";
    const objectIdRe = /^[0-9a-fA-F]{24}$/;

    function validateRequired(toCheck) {
        return toCheck.hasOwnProperty("visitTime")
            && toCheck.hasOwnProperty("placeId")
            && typeof toCheck["placeId"] === "string"
            && typeof toCheck["visitTime"] === "string"
            && objectIdRe.test(toCheck["placeId"]);
    }

    function validateOptionals(toCheck) {

        if (toCheck.hasOwnProperty('assignedPairs') && typeof toCheck.assignedPairs !== "object") {
            return false;
        } else if (toCheck.hasOwnProperty('assignedPairs') && Array.isArray(toCheck.assignedPairs) && toCheck.assignedPairs.length > 0) {

            for (let obj of toCheck.assignedPairs) {

                if (obj.length !== 2 || !obj.hasOwnProperty('pairId') || !obj.hasOwnProperty('status')) {
                    return false;
                } else if ( objectIdRe.test(obj['pairId']) || typeof obj['status'] !== 'string') {
                    return false;
                }
            }
        }

        if (toCheck.hasOwnProperty('details') && typeof toCheck.details !== "string") {
            return false;
        }

        return true;
    }

    function pruneExcessive(toPrune) {
        let pruned = {};

        pruned.visitTime = (toPrune.hasOwnProperty('visitTime')) ? new Date(toPrune.visitTime) : undefined;
        pruned.placeId = (toPrune.hasOwnProperty('placeId')) ? toPrune.placeId : undefined;
        pruned.assignedPairs = (toPrune.hasOwnProperty('assignedPairs')) ? toPrune.assignedPairs : undefined;
        pruned.details = (toPrune.hasOwnProperty('details')) ? toPrune.details : undefined;

        return pruned;
    }

    exports.validateRequired = validateRequired;
    exports.validateOptionals = validateOptionals;
    exports.pruneExcessive = pruneExcessive;
}());