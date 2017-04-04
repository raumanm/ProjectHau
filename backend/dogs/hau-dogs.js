/*jslint node:true */

(function () {
    "use strict";
    let hauDB, safeObjectId, express, validator, app, hauResponse;

	express = require('express');
    app = module.exports = express();

    hauDB = require('../hau-db');
    validator = require('./validate-dog');
	hauResponse = require('../hau-response');

    safeObjectId = hauDB.safeObjectId;
	
	app.route("\/dogs(\/)?$")
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

	
	app.route("\/dogs\/:id([0-9a-fA-F]{24})(\/)?$")
	.all((req, res, next) => {
		next();
	})
	.get((req, res, next) => {
		getById(req.params.id, (dog) => hauResponse.sendResponse(res, dog));
	})
    .update((req, res, next) => {
        if (req.get('Content-Type') === 'application/json') {
            updateById(req.params.id, req.body, (result) => hauResponse(res, result));
        }
    })
	.delete((req, res, next) => {
		deleteById(req.params.id, (dog) => hauResponse.sendResponse(res, dog));
	});
	
	
    function postNew(dog, callback) {
        dog = validator.pruneExcessive(dog);

        if (validator.validateRequired(dog) && validator.validateOptionals(dog)) {
            hauDB.db.collection('dogs').insertOne(dog, function (err, result) {
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
        hauDB.db.collection('dogs').find({}).toArray(function(err, docs) {
            if (!err) {
                callback(hauResponse.createOkResponse(docs));
            } else {
                callback(hauResponse.createErrorResponse(err));
            }
        });
    }

    function getById(id, callback) {
        hauDB.db.collection('dogs').find({ _id: safeObjectId(id)}).toArray(function(err, docs) {
            let dog;

            if (!err) {
                dog = docs.pop();

                if (dog !== undefined) {
                    hauDB.db.collection('pairs')
                        .find({'dog._id': safeObjectId(dog._id)}, { '_id': 0, 'user._id': 1})
                        .toArray(function (err, pairs) {

                        let userIds = [];

                        if (!err) {
                            while (pairs.length > 0) {
                                userIds.push(safeObjectId(pairs.pop().user._id));
                            }

                            if (userIds.length > 0) {
                                hauDB.db.collection('users')
                                    .find({_id: {$in: userIds}}, { _id: 1, firstName: 1, lastName: 1})
                                    .toArray(function (err, users) {
                                        dog.pairedUsers = users;
                                        callback(hauResponse.createOkResponse(dog));
                                    });
                            } else {
                                callback(hauResponse.createOkResponse(dog));
                            }
                        } else {
                            callback(hauResponse.createErrorResponse(err))
                        }
                    });
                } else {
                    callback(hauResponse.createNotFoundResponse(id));
                }
            } else {
                callback(hauResponse.createErrorResponse(err));
            }
        });
    }

    function updateById(dogId, replacement, callback) {
        let dog = validator.pruneExcessive(replacement);
        if (validator.validateRequired(dog) && validator.validateOptionals(dog)) {
            hauDB.db.collection('dogs').updateOne({ _id: safeObjectId(dogId) }, dog, function (err, count, result) {
                if (!err) {
                    if( count > 0 ) {
                        callback(hauResponse.createOkResponse(result));
                    } else {
                        callback(hauResponse.createNotFoundResponse(dogId))
                    }
                } else {
                    callback(hauResponse.createErrorResponse(err));
                }
            });
        } else {
            callback(hauResponse.createBadRequestResponse());
        }
    }

    function deleteById(dogId, callback) {
        hauDB.db.collection('dogs').deleteOne({ _id: safeObjectId(dogId)}, (err, response) => {
            if (!err) {
                if (response.deletedCount === 1) {
                    hauDB.db.collection('pairs').deleteMany({'dog._id': safeObjectId(dogId)}, (errs, r) => {
                        if (!errs) {
                            callback(hauResponse.createOkResponse(r));
                        } else {
                            callback(hauResponse.createErrorResponse(errs));
                        }
                    });
                } else {
                    callback(hauResponse.createNotFoundResponse(dogId));
                }
            } else {
                callback(hauResponse.createErrorResponse(err));
            }
        });
    }
}());
