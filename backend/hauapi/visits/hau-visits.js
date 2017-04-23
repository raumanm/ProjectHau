/*jslint node:true */
(function () {
    "use strict";
    let hauDB, safeObjectId, express, validator, app, hauResponse;

    express = require('express');
    app = module.exports = express();

    hauDB = require('../hau-db');
    validator = require('./validate-visit');
    hauResponse = require('../hau-response');

    safeObjectId = hauDB.safeObjectId;

    app.route("\/visits(\/)?$")
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


    app.route("\/visits\/:id([0-9a-fA-F]{24})(\/)?$")
        .all((req, res, next) => {
            next();
        })
        .get((req, res, next) => {
            getById(req.params.id, (visit) => hauResponse.sendResponse(res, visit));
        })
        .put((req, res, next) => {
            if (req.get('Content-Type') === 'application/json') {
                updateById(req.params.id, req.body, (result) => hauResponse.sendResponse(res, result));
            }
        })
        .delete((req, res, next) => {
            deleteById(req.params.id, (visit) => hauResponse.sendResponse(res, visit));
        });

    function postNew(visit, callback) {
        var pruned = validator.pruneExcessive(visit),
            place;

        if (!validator.validateRequired(pruned) || !validator.validateOptionals(pruned)) {
            callback(hauResponse.createBadRequestResponse());
        } else {
            hauDB.db.collection('places').find({'_id': safeObjectId(pruned.placeId) },{'name':1}).toArray((err, places) => {
                if (err) {
                    callback(hauResponse.createErrorResponse(err));
                }
                if(places === undefined || places === null || places.length === 0) {
                    console.log(places);
                    callback(hauResponse.createNotFoundResponse(pruned.placeId));
                } else {
                    place = places.pop();
                    pruned.placeName = place.name;
                    hauDB.db.collection('visits').insertOne(pruned, (err, result) => {
                        if (err) {
                            console.log(err);
                            callback(hauResponse.createErrorResponse(err));
                        } else {
                            callback(hauResponse.createOkResponse(result));
                        }
                    });
                }
            });
        }
    }

    function getAll(callback) {
        hauDB.db.collection('visits').find({}).toArray(function(err, docs) {
            if (err) {
                callback(hauResponse.createErrorResponse(err));
            } else {
                callback(hauResponse.createOkResponse(docs));
            }
        });
    }

    function getById(visitId, callback) {
        hauDB.db.collection('visits').find({ _id: safeObjectId(visitId)}).toArray(function (err, docs) {
            if (!err) {
                let pair = docs.pop();

                if (pair === undefined) {
                    callback(hauResponse.createNotFoundResponse(visitId));
                } else {
                    callback(hauResponse.createOkResponse(pair));
                }
            } else {
                callback(hauResponse.createErrorResponse(err))
            }
        });
    }

    function updateById(visitId, replacement, callback) {
        let visit = validator.pruneExcessive(replacement);
        if (validator.validateRequired(visit) && validator.validateOptionals(visit)) {
            hauDB.db.collection('visits').updateOne({ _id: safeObjectId(visitId) }, visit, function (err, result) {
                console.log(result);
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

    function deleteById(visitId, callback) {
        hauDB.db.collection('visits').deleteOne({ _id: safeObjectId(visitId)}, (err, response) => {
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
