/*jslint node:true */
(function () {
    "use strict";
    const objectIdRe = /^[0-9a-fA-F]{24}$/;

    function validateUser(toCheck) {
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

    function validatePlace(toCheck) {
        return toCheck.hasOwnProperty("name")
            && toCheck.hasOwnProperty("addressStreet")
            && toCheck.hasOwnProperty("addressCode")
            && toCheck.hasOwnProperty("addressCity")
            && toCheck.hasOwnProperty("visitationInterval")
            && typeof toCheck["accessLevel"] === "number"
            && typeof toCheck["name"] === "string"
            && typeof toCheck["addressStreet"] === "string"
            && typeof toCheck["addressCity"] === "string"
            && typeof toCheck["visitationInterval"] === "string"
            && (toCheck["visitationInterval"] === "Regular" ||
                toCheck["visitationInterval"] === "One time");
    }

    function validateDog(toCheck) {
        return toCheck.hasOwnProperty("nameFull")
            && toCheck.hasOwnProperty("dateBirth")
            && toCheck.hasOwnProperty("breed")
            && toCheck.hasOwnProperty("status")
            && typeof toCheck["nameFull"] === "string"
            && typeof toCheck["breed"] === "string"
            && typeof toCheck["status"] === "string"
            && (toCheck["status"] === "Active" ||
                toCheck["status"] === "Passive" ||
                toCheck["status"] === "Retired");
    }

    function validatePair(toCheck) {
        return toCheck.hasOwnProperty("userId")
            && toCheck.hasOwnProperty("dogId")
            && typeof toCheck["userId"] === "string"
            && typeof toCheck["dogId"] === "string"
            && objectIdRe.test(toCheck["userId"])
            && objectIdRe.test(toCheck["dogId"]);
    }

    function validateVisit(toCheck) {
        return toCheck.hasOwnProperty("visitTime")
            && toCheck.hasOwnProperty("placeId")
            && typeof toCheck["placeId"] === "string"
            && typeof toCheck["visitTime"] === "string"
            && objectIdRe.test(toCheck["placeId"]);
    }


    exports.validateUser = validateUser;
    exports.validatePlace = validatePlace;
    exports.validateDog = validateDog;
    exports.validatePair = validatePair;
    exports.validateVisit = validateVisit;
}());
