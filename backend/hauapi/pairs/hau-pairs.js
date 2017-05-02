/*jslint node:true */
(function () {
    "use strict";
    let app, hauDB, safeObjectId, express, validator, hauResponse;

    express = require('express');
    app = module.exports = express();

    hauDB = require('../hau-db');
    validator = require('./validate-pair');
    hauResponse = require('../hau-response');
    
    safeObjectId = hauDB.safeObjectId;

    app.route("\/pairs(\/)?$")
    .all((req, res, next) => {
        next();
    })
    .get((req, res, next) => {
        getAll((pairs) => hauResponse.sendResponse(res, pairs));
    });

    app.post("\/pairs\/user\/:userId([0-9a-fA-F]{24})\/dog\/:dogId([0-9a-fA-F]{24})(\/)?$", function (req, res) {
        if (req.get('Content-Type') === 'application/json') {
            postNew(req.params, result => hauResponse.sendResponse(res, result));
        }
    });

    app.route("\/pairs\/:id([0-9a-fA-F]{24})\/$")
    .all((req, res, next) => {
        next();
    })
    .get((req, res, next) => {
        getById(req.params.id, (pair) => hauResponse.sendResponse(res, pair));
    })
    .delete((req, res, next) => {
        deleteById(req.params.id, (pair) => hauResponse.sendResponse(res, pair));
    });

    function postNew(ids, callback) {
        let pair = {};

        if (validator.validateRequired(ids)) {
            hauDB.db.collection('users')
                .find({_id: safeObjectId(ids['userId'])}, {'_id': 1, 'firstName': 1, 'lastName': 1})
                .toArray((err, user) => {
                    if (!err) {
                        hauDB.db.collection('dogs')
                            .find({_id: safeObjectId(ids['dogId'])}, {'_id': 1, 'nameFull': 1, 'nameNickname': 1})
                            .toArray((errs, dog) => {
                                if (!errs) {
                                    pair.user = user.pop();
                                    pair.dog = dog.pop();

                                    if (pair.user === undefined) {
                                        callback(hauResponse.createNotFoundResponse(ids['userId']));
                                    } else if (pair.dog === undefined) {
                                        callback(hauResponse.createNotFoundResponse(ids['dogId']));
                                    } else {
                                        hauDB.db.collection('pairs').insertOne(pair, (err, result) => {
                                            if (!err) {
                                                callback(hauResponse.createOkResponse(result));
                                            } else {
                                                callback(hauResponse.createErrorResponse(err));
                                            }
                                        });
                                    }
                                } else {
                                    callback(hauResponse.createErrorResponse(errs));
                                }
                            });
                    } else {
                        callback(hauResponse.createErrorResponse(err));
                    }
                });
        } else {
            callback(hauResponse.createBadRequestResponse());
        }
    }

    function getAll(callback) {
        hauDB.db.collection('pairs').find({}).toArray(function(err, docs) {
            if (err) {
                callback(hauResponse.createErrorResponse(err));
            } else {
                callback(hauResponse.createOkResponse(docs));
            }
        });
    }

    function getById(pairId, callback) {
        hauDB.db.collection('pairs').find({ _id: safeObjectId(pairId)}).toArray(function (err, docs) {
            if (err) { callback(hauResponse.createErrorResponse(err)); }

            let pair = docs.pop();

            if (pair === undefined) {
                callback(hauResponse.createNotFoundResponse(pairId));
            } else {
                callback(hauResponse.createFoundResponse(pair));
            }
        });
    }

    function deleteById(pairId, callback) {
        hauDB.db.collection('pairs').deleteOne({ _id: safeObjectId(pairId)}, (err, response) => {
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