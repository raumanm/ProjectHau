/*jslint node:true */
import * as hauResponse from "../hau-response";

(function () {
    "use strict";

    let db, hauDB, safeObjectId, express, validator;

    hauDB = require('../hau-db');
    validator = require('./validate-visit');
    express = require('express');
    db = hauDB['db'];
    safeObjectId = hauDB.safeObjectId;

    function postNew(visit, callback) {
        visit = validator.pruneExcessive(visit);

        if (!validator.validateRequired(visit) || !validator.validateOptionals()) {
            callback(hauResponse.createBadRequestResponse());
        } else {
            db.collection('visits').insertOne(visit, (err, result) => {
                if (err) {
                    callback(hauResponse.createErrorResponse(err));
                } else {
                    callback(hauResponse.createOkResponse(result));
                }
            });
        }
    }

    function getAll(callback) {
        db.collection('visits').find({}).toArray(function(err, docs) {
            if (err) {
                callback(hauResponse.createErrorResponse(err));
            } else {
                callback(hauResponse.createOkResponse(docs));
            }
        });
    }

    function getById(visitId, callback) {
        db.collection('visits').find({ _id: safeObjectId(visitId)}).toArray(function (err, docs) {
            if (!err) {
                let pair = docs.pop();

                if (pair === undefined) {
                    return hauResponse.createNotFoundResponse(visitId);
                } else {
                    return hauResponse.createFoundResponse(pair);
                }
            } else {
                callback(hauResponse.createErrorResponse(err))
            }
        });
    }

    //TODO: PUT update method

    function deleteById(visitId, callback) {
        db.collection('visits').deleteOne({ _id: safeObjectId(visitId)}, (err, response) => {
            if (err) {
                callback(hauResponse.createErrorResponse(err));
            } else {
                if (response.deletedCount === 1) {
                    callback(hauResponse.createOkResponse(response));
                } else {
                    callback(hauResponse.createNotFoundResponse(visitId));
                }
            }
        });
    }
}());