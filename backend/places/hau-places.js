/*jslint node:true */
import * as hauResponse from "../hau-response";

(function () {
    "use strict";

    let db, hauDB, safeObjectId, express, validator;

    hauDB = require('../hau-db');
    validator = require('./validate-place');
    express = require('express');
    db = hauDB['db'];
    safeObjectId = hauDB.safeObjectId;

    function postNew(place, callback) {
        place = validator.pruneExcessive(place);
        if (validator.validateRequired(place) && validator.validateOptionals(place)) {
            callback(hauResponse.createBadRequestResponse());
        } else {
            db.collection('places').insertOne(place, (err, result) => {
                if (err) {
                    callback(hauResponse.createErrorResponse(err));
                } else {
                    callback(hauResponse.createOkResponse(result));
                }
            });
        }
    }

    function getAll(callback) {
        db.collection('places').find({}).toArray(function(err, docs) {
            if (err) {
                callback(hauResponse.createErrorResponse(err));
            } else {
                callback(hauResponse.createOkResponse(docs));
            }
        });
    }

    function getById(id, callback) {
        let place;

        db.collection('places').find({
            _id: safeObjectId(id)
        }).toArray(function(err, docs) {
            if (err) {
                callback(hauResponse.createErrorResponse(err));
            } else {
                place = docs.pop();

                if (place !== undefined && place.hasOwnProperty('overseerId')) {
                    db.collection('users').find({
                        _id: safeObjectId(place.overseerId)
                    }, {
                        '_id': 1,
                        'firstName': 1,
                        'lastName': 1
                    }).toArray(function(err, trusted) {
                        place.overseerId = trusted.pop();
                        callback(hauResponse.createOkResponse(place));
                    });
                } else if (place === undefined) {
                    callback(hauResponse.createNotFoundResponse(id));
                } else {
                    callback(hauResponse.createOkResponse(place));
                }
            }
        });
    }

    //TODO: PUT update method

    function deleteById(placeId, callback) {
        db.collection('places').deleteOne({ _id: safeObjectId(placeId)}, (err, response) => {
            if (err) {
                callback(hauResponse.createErrorResponse(err));
            } else {
                if (response.deletedCount === 1) {
                    callback(hauResponse.createOkResponse(response));
                } else {
                    callback(hauResponse.createNotFoundResponse(placeId));
                }
            }
        });
    }
}());