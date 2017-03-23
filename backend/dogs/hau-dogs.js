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
	.get((req, res, next) => {
		getAll((docs) => hauResponse.sendResponse(res, docs));
	})
	.post((req, res, next) => {
		if (req.get('Content-Type') === 'application/json') {
            postNew(req.body, (result) => hauResponse.sendResponse(res, result));
        }
	});
	
	app.route("\/dogs\/:id([0-9a-fA-F]{24})(\/)?$")
	.all((req, res, next) => {
		next();
	})
	.get((req, res, next) => {
		getById(req.params.id, (dog) => hauResponse.sendResponse(res, dog));
	})
	.delete((req, res, next) => {
		deleteById(req.params.id, (dog) => hauResponse.sendResponse(res, dog));
	});
	
	
    function postNew(dog, callback) {
        dog = validator.pruneExcessive(dog);

        if (!validator.validateRequired(dog) || !validator.validateOptionals(dog)) {
            callback(hauResponse.createBadRequestResponse());
        } else {
            hauDB.db.collection('dogs').insertOne(dog, function (err, result) {
                if (err) {
                    callback(hauResponse.createErrorResponse(err));
                } else {
                    console.log(result);
                    callback(hauResponse.createOkResponse(result));
                }
            });
        }
    }

    function getAll(callback) {
        hauDB.db.collection('dogs').find({}).toArray(function(err, docs) {
            if (err) {
                callback(hauResponse.createErrorResponse(err));
            } else {
                callback(hauResponse.createOkResponse(docs));
            }
        });
    }

    function getById(id, callback) {
        hauDB.db.collection('dogs').find({ _id: safeObjectId(id)}).toArray(function(err, docs) {
            let dog;

            if (err) {
                callback(hauResponse.createErrorResponse(err));
            } else {
                dog = docs.pop();

                if (dog !== undefined) {
                    hauDB.db.collection('pairs').find({ 'dog._id': safeObjectId(dog._id)}, { '_id': 0, 'user._id': 1}).toArray(function(err, pairs) {
                        let userids = [];

                        if (err) {
                            callback(hauResponse.createErrorResponse(err))
                        } else {

                            while (pairs.length > 0) {
                                userids.push(safeObjectId(pairs.pop().user._id));
                            }

                            if (userids.length > 0) {
                                hauDB.db.collection('users').find({ _id: { $in: userids}}, { _id: 1, firstName: 1, lastName: 1}).toArray(function(err, users) {
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

    function deleteById(dogId, callback) {
        hauDB.db.collection('dogs').deleteOne({ _id: safeObjectId(dogId)}, (err, response) => {
            if (err) {
                callback(hauResponse.createErrorResponse(err));
            } else {
                if (response.deletedCount === 1) {
                    hauDB.db.collection('pairs').deleteMany({ 'dog._id': safeObjectId(dogId)}, (errs, r) => {
                        if (errs) {
                            callback(hauResponse.createErrorResponse(errs));
                        } else {
                            callback(hauResponse.createOkResponse(r));
                        }
                    });
                } else {
                    callback(hauResponse.createNotFoundResponse(dogId));
                }
            }
        });
    }
}());
