/*jslint node:true */
(function () {
    "use strict";
    let app, hauDB, safeObjectId, express, validator, hauResponse;

    express = require('express');
    app = module.exports = express();

    hauDB = require('../hau-db');
    validator = require('./validate-place');
    hauResponse = require('../hau-response');

    safeObjectId = hauDB.safeObjectId;

    app.route("\/places(\/)?$")
    .all((req, res, next) => {
        next();
    })
    .post((req, res, next) => {
        if (req.get('Content-Type') === 'application/json') {
            postNew(req.body, (result) => hauResponse.sendResponse(res, result));
        }

    })
    .get((req, res, next) => {
        getAll((docs) => hauResponse.sendResponse(res, docs));
    });

    app.route("\/places\/:id([0-9a-fA-F]{24})(\/)?$")
    .all((req, res, next) => {
        next();
    })
    .get((req, res, next) => {
        getById(req.params.id, (place) => hauResponse.sendResponse(res, place));
    })
    .delete((req, res, next) => {
        deleteById(req.params.id, (place) => hauResponse.sendResponse(res, place));
    });

    function postNew(place, callback) {
        place = validator.pruneExcessive(place);
        if (validator.validateRequired(place) && validator.validateOptionals(place)) {
            hauDB.db.collection('places').insertOne(place, (err, result) => {
                if (!err) {
                    callback(hauResponse.createOkResponse(result));
                } else {
                    callback(hauResponse.createErrorResponse(err));
                }
            });
        } else {
            callback(hauResponse.createBadRequestResponse());
        }
    }

    function getAll(callback) {
        hauDB.db.collection('places').find({}).toArray(function(err, docs) {
            if (!err) {
                callback(hauResponse.createOkResponse(docs));
            } else {
                callback(hauResponse.createErrorResponse(err));
            }
        });
    }

    function getById(id, callback) {
        let place;

        hauDB.db.collection('places')
            .find({ _id: safeObjectId(id)})
            .toArray(function(err, docs) {

                if (!err) {
                    place = docs.pop();

                    if (place !== undefined && place.hasOwnProperty('overseerId')) {
                        hauDB.db.collection('users')
                            .find({_id: safeObjectId(place.overseerId)}, {'_id': 1, 'firstName': 1, 'lastName': 1})
                            .toArray(function (err, trusted) {

                                place.overseerId = trusted.pop();
                                callback(hauResponse.createOkResponse(place));
                            });
                    } else if (place !== undefined) {
                        callback(hauResponse.createOkResponse(place));
                    } else {
                        callback(hauResponse.createNotFoundResponse(id));
                    }
                } else {
                    callback(hauResponse.createErrorResponse(err));
                }
        });
    }

    function deleteById(placeId, callback) {
        hauDB.db.collection('places')
            .deleteOne({ _id: safeObjectId(placeId)}, (err, response) => {
                if (!err) {
                    if (response.deletedCount === 1) {
                        callback(hauResponse.createOkResponse(response));
                    } else {
                        callback(hauResponse.createNotFoundResponse(placeId));
                    }
                } else {
                    callback(hauResponse.createErrorResponse(err));
                }
        });
    }
}());
