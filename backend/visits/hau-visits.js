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
        visit = validator.pruneExcessive(visit);

        if (!validator.validateRequired(visit) || !validator.validateOptionals()) {
            callback(hauResponse.createBadRequestResponse());
        } else {
            hauDB.db.collection('visits').insertOne(visit, (err, result) => {
                if (err) {
                    callback(hauResponse.createErrorResponse(err));
                } else {
                    callback(hauResponse.createOkResponse(result));
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
                    return hauResponse.createNotFoundResponse(visitId);
                } else {
                    return hauResponse.createFoundResponse(pair);
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
