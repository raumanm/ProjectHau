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

        pruned.nameFull = (toPrune.hasOwnProperty('nameFull')) ? toPrune.nameFull : undefined;
        pruned.nameNickname = (toPrune.hasOwnProperty('nameNickname')) ? toPrune.nameNickname : undefined;
        pruned.dateBirth = (toPrune.hasOwnProperty('dateBirth')) ? new Date(toPrune.dateBirth) : undefined;
        pruned.breed = (toPrune.hasOwnProperty('breed')) ? toPrune.breed : undefined;
        pruned.status = (toPrune.hasOwnProperty('status')) ? toPrune.status : undefined;
        pruned.registerNumber = (toPrune.hasOwnProperty('registerNumber')) ? toPrune.registerNumber : undefined;
        pruned.dateQualification = (toPrune.hasOwnProperty('dateQualification')) ? new Date(toPrune.dateQualification) : undefined;
        pruned.dateGraduation = (toPrune.hasOwnProperty('dateGraduation')) ? new Date(toPrune.dateGraduation) : undefined;
        pruned.dateMedal = (toPrune.hasOwnProperty('dateMedal')) ? new Date(toPrune.dateMedal) : undefined;
        pruned.dateRetired = (toPrune.hasOwnProperty('dateRetired')) ? new Date (toPrune.dateRetired) : undefined;
        pruned.details = (toPrune.hasOwnProperty('details')) ? toPrune.details : undefined;

        return pruned;
    }

    exports.validateRequired = validateRequired;
    exports.validateOptionals = validateOptionals;
    exports.pruneExcessive = pruneExcessive;
}());