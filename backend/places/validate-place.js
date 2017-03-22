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

        pruned.name = (toPrune.hasOwnProperty('name')) ? toPrune.name : undefined;
        pruned.addressStreet = (toPrune.hasOwnProperty('addressStreet')) ? toPrune.addressStreet : undefined;
        pruned.addressCode = (toPrune.hasOwnProperty('addressCode')) ? toPrune.addressCode : undefined;
        pruned.addressCity = (toPrune.hasOwnProperty('addressCity')) ? toPrune.addressCity : undefined;
        pruned.visitationInterval = (toPrune.hasOwnProperty('visitationInterval')) ? toPrune.visitationInterval : undefined;
        pruned.contactName = (toPrune.hasOwnProperty('contactName')) ? toPrune.contactName : undefined;
        pruned.contactPhone = (toPrune.hasOwnProperty('contactPhone')) ? toPrune.contactPhone : undefined;
        pruned.regularPairs = (toPrune.hasOwnProperty('regularPairs')) ? toPrune.regularPairs : undefined;
        pruned.pairAmount = (toPrune.hasOwnProperty('pairAmount')) ? toPrune.pairAmount : undefined;
        pruned.details = (toPrune.hasOwnProperty('details')) ? toPrune.details : undefined;
        pruned.overseerId = (toPrune.hasOwnProperty('overseerId')) ? toPrune.overseerId : undefined;

        return pruned;
    }

    exports.validateRequired = validateRequired;
    exports.validateOptionals = validateOptionals;
    exports.pruneExcessive = pruneExcessive;
}());