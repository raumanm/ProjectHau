/*jslint node:true */
(function (){
    "use strict";
    let hauDB, safeObjectId, express, validator, app, hauResponse;

    express = require('express');
    app = module.exports = express();

    hauDB = require('../hau-db');
    validator = require('./validate-user');
    hauResponse = require('../hau-response');

    safeObjectId = hauDB.safeObjectId;

    app.route("\/users(\/)?$")
    .all((req, res, next) => {
        next();
    })
    .post((req, res, next) => {
        if (req.get('Content-Type') === 'application/json') {
            postNew(req.body.data, (result) => hauResponse.sendResponse(res, result));
        }
    })
    .get((req, res, next) => {
        getAll((docs) => hauResponse.sendResponse(res, docs));
    });

    app.route("\/users\/:id([0-9a-fA-F]{24})(\/)?$")
    .all((req, res, next) => {
        next();
    })
    .get((req, res, next) => {
        getById(req.params.id, (dog) => hauResponse.sendResponse(res, dog));
    })
    .put((req, res, next) => {
        if (req.get('Content-Type') === 'application/json') {
            updateById(req.params.id, req.body.data, (result) => hauResponse.sendResponse(res, result));
        }
    })
    .delete((req, res, next) => {
        deleteById(req.params.id, (dog) => hauResponse.sendResponse(res, dog));
    });

    function postNew(user, callback) {
        user = validator.pruneExcessive(user);

        if (validator.validateRequired(user) && validator.validateOptionals(user)) {
            hauDB.db.collection('users').find({ 'username': user.username}).count(function(err, counter) {
                if (err) {
                    callback(hauResponse.createErrorResponse(err));
                } else {
                    if (counter === 0) {
                        hauDB.db.collection('users').insertOne(user, (err, result) => {
                            if (err) {
                                callback(hauResponse.createErrorResponse(err));
                            } else {
                                callback(hauResponse.createOkResponse(result));
                            }
                        });
                    } else {
                        callback(hauResponse.createFoundResponse(user.username));
                    }
                }
            });
        } else {
            callback(hauResponse.createBadRequestResponse());
        }
    }

    function getAll(callback) {
        hauDB.db.collection('users').find({}, { password: 0}).toArray(function(err, docs) {
            if (err) {
                callback(hauResponse.createErrorResponse(err));
            } else {
                callback(hauResponse.createOkResponse(docs));
            }
        });
    }

    function getById(id, callback) {

        hauDB.db.collection('users').find({ _id: safeObjectId(id)}, { password: 0}).toArray(function(err, docs) {
            let user;

            if (err) {
                callback(hauResponse.createErrorResponse(err));
            } else {
                user = docs.pop();

                if (user !== undefined) {
                    hauDB.db.collection('pairs').find({ 'user._id': safeObjectId(user._id)}, { '_id': 0, 'dog._id': 1 }).toArray(function(err, pairs) {
                        let dogids = [];

                        while (pairs.length > 0) {
                            dogids.push(safeObjectId(pairs.pop().dog._id));
                        }

                        if (err) {
                            callback(hauResponse.createErrorResponse(err));
                        } else {

                            if (dogids.length > 0) {
                                hauDB.db.collection('dogs').find({ _id: { $in: dogids}}, { _id: 1, nameFull: 1, nameNickname: 1}).toArray(function(err, dogs) {
                                    user.pairedDogs = dogs;
                                    callback(hauResponse.createOkResponse(user));
                                });
                            } else {
                                callback(hauResponse.createOkResponse(user));
                            }
                        }
                    })
                } else {
                    callback(hauResponse.createNotFoundResponse(id));
                }
            }
        });
    }

    function updateById(userId, replacement, callback) {
        let user = validator.pruneExcessive(replacement);
        if (validator.validateRequired(user) && validator.validateOptionals(user)) {
            hauDB.db.collection('users').updateOne({ _id: safeObjectId(userId) }, user, function (err, result) {
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

    function deleteById(userid, callback) {
        hauDB.db.collection('users').deleteOne({ _id: safeObjectId(userid)}, (err, response) => {
            if (err) {
                callback(hauResponse.createErrorResponse(err));
            } else {
                if (response.deletedCount === 1) {
                    hauDB.db.collection('pairs').deleteMany({ 'user._id': safeObjectId(userid)}, (errs, r) => {
                        if (errs) {
                            callback(hauResponse.createErrorResponse(err));
                        } else {
                            callback(hauResponse.createOkResponse(r));
                        }
                    });
                } else {
                    callback(hauResponse.createNotFoundResponse(userid));
                }
            }
        });
    }

}());