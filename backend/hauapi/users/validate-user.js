/*jslint node:true */
(function () {
    "use strict";

    function validateRequired(toCheck) {
        return toCheck.hasOwnProperty("accessLevel")
            && toCheck.hasOwnProperty("username")
            && toCheck.hasOwnProperty("firstName")
            && toCheck.hasOwnProperty("lastName")
            && toCheck.hasOwnProperty("phone")
            && toCheck.hasOwnProperty("email")
            && typeof toCheck["accessLevel"] === "string"
            && typeof toCheck["username"] === "string"
            && typeof toCheck["firstName"] === "string"
            && typeof toCheck["lastName"] === "string"
            && typeof toCheck["phone"] === "string"
            && typeof toCheck["email"] === "string";
    }

    function validateOptionals(toCheck) {

        if (toCheck.hasOwnProperty("memberNumber") && typeof toCheck.memberNumber !== "string") {
            return false;
        }

        if (toCheck.hasOwnProperty("qualificationDate") && Object.prototype.toString.call(toCheck["qualificationDate"]) !== '[object Date]') {
            return false;
        }

        if (toCheck.hasOwnProperty("details") && typeof toCheck.details !== "string") {
            return false;
        }

        return true;
    }

    function pruneExcessive(toPrune) {
        let pruned = {};

        (toPrune.hasOwnProperty('accessLevel')) ? pruned.accessLevel = toPrune.accessLevel : undefined;
        (toPrune.hasOwnProperty('username')) ? pruned.username = toPrune.username : undefined;
        (toPrune.hasOwnProperty('password')) ? pruned.password = toPrune.password : undefined;
        (toPrune.hasOwnProperty('firstName')) ? pruned.firstName = toPrune.firstName : undefined;
        (toPrune.hasOwnProperty('lastName')) ? pruned.lastName = toPrune.lastName : undefined;
        (toPrune.hasOwnProperty('phone')) ? pruned.phone = toPrune.phone : undefined;
        (toPrune.hasOwnProperty('email')) ? pruned.email = toPrune.email : undefined;
        (toPrune.hasOwnProperty('memberNumber')) ? pruned.memberNumber = toPrune.memberNumber : undefined;
        (toPrune.hasOwnProperty('qualificationDate')) ? pruned.qualificationDate = new Date(toPrune.qualificationDate) : undefined;
        (toPrune.hasOwnProperty('details')) ? pruned.details = toPrune.details : undefined;

        return pruned;
    }

    exports.validateRequired = validateRequired;
    exports.validateOptionals = validateOptionals;
    exports.pruneExcessive = pruneExcessive;
}());