/*jslint node:true */
(function () {
    "use strict";

    function validateRequired(toCheck) {
        return toCheck.hasOwnProperty("accessLevel")
            && toCheck.hasOwnProperty("username")
            && toCheck.hasOwnProperty("password")
            && toCheck.hasOwnProperty("firstName")
            && toCheck.hasOwnProperty("lastName")
            && toCheck.hasOwnProperty("phone")
            && toCheck.hasOwnProperty("email")
            && typeof toCheck["accessLevel"] === "string"
            && typeof toCheck["username"] === "string"
            && typeof toCheck["password"] === "string"
            && typeof toCheck["firstName"] === "string"
            && typeof toCheck["lastName"] === "string"
            && typeof toCheck["phone"] === "string"
            && typeof toCheck["email"] === "string";
    }

    function validateOptionals(toCheck) {

        if (toCheck.hasOwnProperty(memberNumber) && typeof toCheck.memberNumber !== "string") {
            return false;
        }

        if (toCheck.hasOwnProperty(qualificationDate) && typeof toCheck.qualificationDate !== "string") {
            return false;
        }

        if (toCheck.hasOwnProperty(details) && typeof toCheck.details !== "string") {
            return false;
        }

        return true;
    }

    function pruneExcessive(toPrune) {
        let pruned = {};

        pruned.accessLevel = (toPrune.hasOwnProperty('accessLevel')) ? toPrune.accessLevel : undefined;
        pruned.username = (toPrune.hasOwnProperty('username')) ? toPrune.username : undefined;
        pruned.password = (toPrune.hasOwnProperty('password')) ? toPrune.password : undefined;
        pruned.firstName = (toPrune.hasOwnProperty('firstName')) ? toPrune.firstName : undefined;
        pruned.lastName = (toPrune.hasOwnProperty('lastName')) ? toPrune.lastName : undefined;
        pruned.phone = (toPrune.hasOwnProperty('phone')) ? toPrune.phone : undefined;
        pruned.email = (toPrune.hasOwnProperty('email')) ? toPrune.email : undefined;
        pruned.memberNumber = (toPrune.hasOwnProperty('memberNumber')) ? toPrune.memberNumber : undefined;
        pruned.qualificationDate = (toPrune.hasOwnProperty('qualificationDate')) ? new Date(toPrune.qualificationDate) : undefined;
        pruned.details = (toPrune.hasOwnProperty('details')) ? toPrune.details : undefined;

        return pruned;
    }

    exports.validateRequired = validateRequired;
    exports.validateOptionals = validateOptionals;
    exports.pruneExcessive = pruneExcessive;
}());