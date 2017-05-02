/*jslint node:true */
(function () {
    "use strict";

    function validateRequired(toCheck) {
        return toCheck.hasOwnProperty("nameFull")
            && toCheck.hasOwnProperty("dateBirth")
            && toCheck.hasOwnProperty("breed")
            && toCheck.hasOwnProperty("status")
            && typeof toCheck["nameFull"] === "string"
            && Object.prototype.toString.call(toCheck["dateBirth"]) === '[object Date]'
            && typeof toCheck["breed"] === "string"
            && typeof toCheck["status"] === "string"
            && (toCheck["status"] === "Active" ||
            toCheck["status"] === "Passive" ||
            toCheck["status"] === "Retired");
    }

    function validateOptionals(toCheck) {

        if (toCheck.hasOwnProperty('nameNickname') && typeof toCheck.nameNickname !== "string") {
            return false;
        }

        if (toCheck.hasOwnProperty('registerNumber') && typeof toCheck.registerNumber !== "string") {
            return false;
        }

        if (toCheck.hasOwnProperty('dateQualification') && Object.prototype.toString.call(toCheck["dateQualification"]) !== '[object Date]') {
            return false;
        }

        if (toCheck.hasOwnProperty('dateGraduation') && Object.prototype.toString.call(toCheck["dateGraduation"]) !== '[object Date]') {
            return false;
        }

        if (toCheck.hasOwnProperty('dateMedal') && Object.prototype.toString.call(toCheck["dateMedal"]) !== '[object Date]') {
            return false;
        }

        if (toCheck.hasOwnProperty('dateRetired') && Object.prototype.toString.call(toCheck["dateRetired"]) !== '[object Date]') {
            return false;
        }

        if (toCheck.hasOwnProperty('details') && typeof toCheck.details !== "string") {
            return false;
        }

        return true;
    }

    function pruneExcessive(toPrune) {
        let pruned = {};

        (toPrune.hasOwnProperty('nameFull')) ? pruned.nameFull = toPrune.nameFull : undefined;
        (toPrune.hasOwnProperty('nameNickname')) ? pruned.nameNickname = toPrune.nameNickname : undefined;
        (toPrune.hasOwnProperty('dateBirth')) ? pruned.dateBirth = new Date(toPrune.dateBirth) : undefined;
        (toPrune.hasOwnProperty('breed')) ? pruned.breed = toPrune.breed : undefined;
        (toPrune.hasOwnProperty('status')) ? pruned.status = toPrune.status : undefined;
        (toPrune.hasOwnProperty('registerNumber')) ? pruned.registerNumber = toPrune.registerNumber : undefined;
        (toPrune.hasOwnProperty('dateQualification')) ? pruned.dateQualification = new Date(toPrune.dateQualification) : undefined;
        (toPrune.hasOwnProperty('dateGraduation')) ? pruned.dateGraduation = new Date(toPrune.dateGraduation) : undefined;
        (toPrune.hasOwnProperty('dateMedal')) ? pruned.dateMedal = new Date(toPrune.dateMedal) : undefined;
        (toPrune.hasOwnProperty('dateRetired')) ? pruned.dateRetired = new Date (toPrune.dateRetired) : undefined;
        (toPrune.hasOwnProperty('details')) ? pruned.details = toPrune.details : undefined;

        return pruned;
    }

    exports.validateRequired = validateRequired;
    exports.validateOptionals = validateOptionals;
    exports.pruneExcessive = pruneExcessive;
}());
