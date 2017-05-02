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

        console.log("saakeli 1");
        if (toCheck.hasOwnProperty('assignedPairs') && typeof toCheck.assignedPairs !== "object") {
            console.log("saakeli 2");
            return false;
        } else if (toCheck.hasOwnProperty('assignedPairs')) {
            console.log("saakeli 3");
            if (!Array.isArray(toCheck.assignedPairs)) {
                console.log("saakeli 4");
                return false;
            }
            console.log("saakeli 5");
            for (let obj of toCheck.assignedPairs) {
                if (Object.keys(obj).length !== 2 || !obj.hasOwnProperty('pairId') || !obj.hasOwnProperty('status')) {
                    console.log("saakeli 6");
                    return false;
                } else if ( !objectIdRe.test(obj['pairId']) || typeof obj['status'] !== 'string') {
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
