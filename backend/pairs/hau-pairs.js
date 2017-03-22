/*jslint node:true */
import * as hauResponse from "../hau-response";

(function () {
    "use strict";

    let db, hauDB, safeObjectId, express, validator;

    hauDB = require('../hau-db');
    validator = require('./validate-pair');
    express = require('express');
    db = hauDB['db'];
    safeObjectId = hauDB.safeObjectId;

    function postNewPair(ids, callback) {
        let pair = {};

        if (!validator.validateRequired(ids)) {
            callback(hauResponse.createBadRequestResponse());
        } else {
            db.collection('users').find({ _id: safeObjectId(ids['userId'])}, { '_id': 1, 'firstName': 1, 'lastName': 1}).toArray((err, user) => {
                if (err) {
                    callback(hauResponse.createErrorResponse(err));
                } else {
                    db.collection('dogs').find({ _id: safeObjectId(ids['dogId'])}, { '_id': 1, 'nameFull': 1, 'nameNickname': 1}).toArray((errs, dog) => {
                        if (errs) {
                            callback(hauResponse.createErrorResponse(errs));
                        } else {
                            pair.user = user.pop();
                            pair.dog = dog.pop();

                            if (pair.user === undefined) {
                                callback(hauResponse.createNotFoundResponse(ids['userId']));
                            } else if (pair.dog === undefined) {
                                callback(hauResponse.createNotFoundResponse(ids['dogId']));
                            } else {
                                db.collection('pairs').insertOne(pair, (err, result) => {
                                    if (err) {
                                        callback(hauResponse.createErrorResponse(err));
                                    } else {
                                        callback(hauResponse.createOkResponse(result));
                                    }
                                });
                            }
                        }
                    });
                }
            });
        }
    }

    function getAll(callback) {
        db.collection('pairs').find({}).toArray(function(err, docs) {
            if (err) {
                callback(hauResponse.createErrorResponse(err));
            } else {
                callback(hauResponse.createOkResponse(docs));
            }
        });
    }

    function getById(pairId, callback) {
        db.collection('pairs').find({ _id: safeObjectId(pairId)}).toArray(function (err, docs) {
            if (err) { return hauResponse.createErrorResponse(err); }

            let pair = docs.pop();

            if (pair === undefined) {
                return hauResponse.createNotFoundResponse(pairId);
            } else {
                return hauResponse.createFoundResponse(pair);
            }
        });
    }

    function deletePairById(pairId, callback) {
        db.collection('pairs').deleteOne({ _id: safeObjectId(pairId)}, (err, response) => {
            if (err) {
                callback(hauResponse.createErrorResponse(err));
            } else {
                if (response.deletedCount === 1) {
                    callback(hauResponse.createOkResponse(response));
                } else {
                    callback(hauResponse.createNotFoundResponse(pairId));
                }
            }
        });
    }
}());