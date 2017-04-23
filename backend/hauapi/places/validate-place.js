/*jslint node:true */
(function () {
    "use strict";


    function validateRequired(toCheck) {
        return toCheck.hasOwnProperty("name")
            && toCheck.hasOwnProperty("addressStreet")
            && toCheck.hasOwnProperty("addressCode")
            && toCheck.hasOwnProperty("addressCity")
            && toCheck.hasOwnProperty("visitationInterval")
            && typeof toCheck["name"] === "string"
            && typeof toCheck["addressStreet"] === "string"
            && typeof toCheck["addressCode"] === "string"
            && typeof toCheck["addressCity"] === "string"
            && typeof toCheck["visitationInterval"] === "string"
            && (toCheck["visitationInterval"] === "Regular" ||
            toCheck["visitationInterval"] === "One time");
    }

    function validateOptionals(toCheck) {

        if (toCheck.hasOwnProperty('contactName') && typeof toCheck.contactName !== "string") {
            return false;
        }

        if (toCheck.hasOwnProperty('contactPhone') && typeof toCheck.contactPhone !== "string") {
            return false;
        }

        if (toCheck.hasOwnProperty('regularPairs') &&
            (typeof toCheck.regularPairs !== "string" || !Array.isArray(toCheck['regularPairs']))) {
            return false;
        }

        if (toCheck.hasOwnProperty('pairAmount') && typeof toCheck.pairAmount !== "number") {
            return false;
        }

        if (toCheck.hasOwnProperty('details') && typeof toCheck.details !== "string") {
            return false;
        }

        if (toCheck.hasOwnProperty('overseerId') && typeof toCheck.overseerId !== "string") {
            return false;
        }

        return true;
    }

    function pruneExcessive(toPrune) {
        let pruned = {};

        (toPrune.hasOwnProperty('name')) ? pruned.name = toPrune.name : undefined;
        (toPrune.hasOwnProperty('addressStreet')) ? pruned.addressStreet = toPrune.addressStreet : undefined;
        (toPrune.hasOwnProperty('addressCode')) ? pruned.addressCode = toPrune.addressCode : undefined;
        (toPrune.hasOwnProperty('addressCity')) ? pruned.addressCity = toPrune.addressCity : undefined;
        (toPrune.hasOwnProperty('visitationInterval')) ? pruned.visitationInterval = toPrune.visitationInterval : undefined;
        (toPrune.hasOwnProperty('contactName')) ? pruned.contactName = toPrune.contactName : undefined;
        (toPrune.hasOwnProperty('contactPhone')) ? pruned.contactPhone = toPrune.contactPhone : undefined;
        (toPrune.hasOwnProperty('regularPairs')) ? pruned.regularPairs = toPrune.regularPairs : undefined;
        (toPrune.hasOwnProperty('pairAmount')) ? pruned.pairAmount = toPrune.pairAmount : undefined;
        (toPrune.hasOwnProperty('details')) ? pruned.details = toPrune.details : undefined;
        (toPrune.hasOwnProperty('overseerId')) ? pruned.overseerId = toPrune.overseerId : undefined;

        return pruned;
    }

    exports.validateRequired = validateRequired;
    exports.validateOptionals = validateOptionals;
    exports.pruneExcessive = pruneExcessive;
}());