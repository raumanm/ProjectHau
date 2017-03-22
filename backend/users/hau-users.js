/*jslint node:true */
import * as hauResponse from "../hau-response";

(function (){
    "use strict";

    let db, hauDB, safeObjectId, express, userValidator;

    hauDB = require('../hau-db');
    userValidator = require('./validate-user');

    express = require('express');
    db = hauDB['db'];
    safeObjectId = hauDB.safeObjectId;

    function postNew(user, callback) {
        user = userValidator.pruneExcessive(user);

        if (userValidator.validateRequired(user) && userValidator.validateOptionals(user)) {
            db.collection('users').find({ 'username': user.username}).count(function(err, counter) {
                if (err) {
                    callback(hauResponse.createErrorResponse(err));
                } else {
                    if (counter === 0) {
                        db.collection('users').insertOne(user, (err, result) => {
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
            callback(hauValidator.createBadRequestResponse());
        }
    }

    function getAll(callback) {
        db.collection('users').find({}, { password: 0}).toArray(function(err, docs) {
            if (err) {
                callback(hauResponse.createErrorResponse(err));
            } else {
                callback(hauResponse.createOkResponse(docs));
            }
        });
    }

    function getById(id, callback) {

        db.collection('users').find({ _id: safeObjectId(id)}, { password: 0}).toArray(function(err, docs) {
            let user;

            if (err) {
                callback(hauResponse.createErrorResponse(err));
            } else {
                user = docs.pop();

                if (user !== undefined) {
                    db.collection('pairs').find({ 'user._id': safeObjectId(user._id)}, { '_id': 0, 'dog._id': 1 }).toArray(function(err, pairs) {
                        let dogids = [];

                        while (pairs.length > 0) {
                            dogids.push(safeObjectId(pairs.pop().dog._id));
                        }

                        if (err) {
                            callback(hauResponse.createErrorResponse(err));
                        } else {

                            if (dogids.length > 0) {
                                db.collection('dogs').find({ _id: { $in: dogids}}, { _id: 1, nameFull: 1, nameNickname: 1}).toArray(function(err, dogs) {
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

    //TODO: PUT update method

    function deleteById(userid, callback) {
        db.collection('users').deleteOne({ _id: safeObjectId(userid)}, (err, response) => {
            if (err) {
                callback(hauResponse.createErrorResponse(err));
            } else {
                if (response.deletedCount === 1) {
                    db.collection('pairs').deleteMany({ 'user._id': safeObjectId(userid)}, (errs, r) => {
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