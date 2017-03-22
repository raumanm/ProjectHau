/*jslint node:true */
import * as hauResponse from "../hau-response";

(function () {
    "use strict";

    let db, hauDB, safeObjectId, express;

    hauDB = require('../hau-db');
    express = require('express');
    db = hauDB['db'];
    safeObjectId = hauDB.safeObjectId;

    function getById(id, callback) {
        db.collection('dogs').find({ _id: safeObjectId(id)}).toArray(function(err, docs) {
            let dog;

            if (err) {
                callback(hauResponse.createErrorResponse(err));
            } else {
                dog = docs.pop();

                if (dog !== undefined) {
                    db.collection('pairs').find({ 'dog._id': safeObjectId(dog._id)}, { '_id': 0, 'user._id': 1}).toArray(function(err, pairs) {
                        let userids = [];

                        if (err) {
                            callback(hauResponse.createErrorResponse(err))
                        } else {

                            while (pairs.length > 0) {
                                userids.push(safeObjectId(pairs.pop().user._id));
                            }

                            if (userids.length > 0) {
                                db.collection('users').find({ _id: { $in: userids}}, { _id: 1, firstName: 1, lastName: 1}).toArray(function(err, users) {
                                    dog.pairedUsers = users;
                                    callback(hauResponse.createOkResponse(dog));
                                });
                            } else {
                                callback(hauResponse.createOkResponse(dog));
                            }
                        }
                    });
                } else {
                    callback(hauResponse.createNotFoundResponse(id));
                }
            }
        });
    }

    function postNew(dog, callback) {
        if (!hauValidator.validateDog(dog)) {
            callback(hauResponse.createBadRequestResponse());
        } else {
            dog.dateBirth = new Date(dog.dateBirth);
            db.collection('dogs').insertOne(dog, function (err, result) {
                if (err) {
                    callback(hauResponse.createErrorResponse(err));
                } else {
                    console.log(result);
                    callback(hauResponse.createOkResponse(result));
                }
            });
        }
    }

    function deleteById(dogid, callback) {
        db.collection('dogs').deleteOne({ _id: safeObjectId(dogid)}, (err, response) => {
            if (err) {
                callback(hauResponse.createErrorResponse(err));
            } else {
                if (response.deletedCount === 1) {
                    db.collection('pairs').deleteMany({ 'dog._id': safeObjectId(dogid)}, (errs, r) => {
                        if (errs) {
                            callback(hauResponse.createErrorResponse(errs));
                        } else {
                            callback(hauResponse.createOkResponse(r));
                        }
                    });
                } else {
                    callback(hauResponse.createNotFoundResponse(dogid));
                }
            }
        });
    }
}());