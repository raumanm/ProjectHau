/*jslint node:true */
(function() {
    "use strict";

    var MongoDB, MongoClient, db, ObjectId, safeObjectId, hauResponse, hauValidator;

    MongoDB = require('mongodb');
    hauResponse = require('./hau-response');
    hauValidator = require('./hau-validator');
    MongoClient = MongoDB.MongoClient;
    ObjectId = MongoDB.ObjectId;

    const objectIdRe = /^[0-9a-fA-F]{24}$/;
    safeObjectId = s => objectIdRe.test(s) ? new ObjectId(s) : null;

    function init() {
        // Initialize connection once
        MongoClient.connect("mongodb://localhost:27017/hauDb", (err, database) => {
            if (err) throw err;
            db = database;
        });
    }

    function getUserById(id, callback) {
        db.collection('users').find({
            _id: safeObjectId(id)
        }, {
            password: 0
        }).toArray(function(err, docs) {
            var user;
            if (err) {
                callback(hauResponse.createErrorResponse(err));
            } else {

                user = docs.pop();
                if (user !== undefined) {
                    db.collection('pairs').find({
                        'user._id': safeObjectId(user._id)
                    }, {
                        '_id': 0,
                        'dog._id': 1
                    }).toArray(function(err, pairs) {
                        var dogids = [];
                        while (pairs.length > 0) {
                            dogids.push(safeObjectId(pairs.pop().dog._id));
                        }

                        if (err) {
                            callback(hauResponse.createErrorResponse(err));
                        } else {

                            if (dogids.length > 0) {
                                db.collection('dogs').find({
                                    _id: {
                                        $in: dogids
                                    }
                                }, {
                                    _id: 1,
                                    nameFull: 1,
                                    nameNickname: 1
                                }).toArray(function(err, dogs) {
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

    function getDogById(id, callback) {
        db.collection('dogs').find({
            _id: safeObjectId(id)
        }).toArray(function(err, docs) {
            var dog;
            if (err) {
                callback(hauResponse.createErrorResponse(err));
            } else {
                dog = docs.pop();
                if (dog !== undefined) {
                    db.collection('pairs').find({
                        'dog._id': safeObjectId(dog._id)
                    }, {
                        '_id': 0,
                        'user._id': 1
                    }).toArray(function(err, pairs) {
                        var userids = [];

                        if (err) {
                            callback(hauResponse.createErrorResponse(err))
                        } else {
                            while (pairs.length > 0) {
                                userids.push(safeObjectId(pairs.pop().user._id));
                            }

                            if (userids.length > 0) {
                                db.collection('users').find({
                                    _id: {
                                        $in: userids
                                    }
                                }, {
                                    _id: 1,
                                    firstName: 1,
                                    lastName: 1
                                }).toArray(function(err, users) {
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

    function getPlaceById(id, callback) {
        var place;

        db.collection('places').find({
            _id: safeObjectId(id)
        }).toArray(function(err, docs) {
            if (err) {
                callback(hauResponse.createErrorResponse(err));
            } else {
                place = docs.pop();

                if (place !== undefined && place.hasOwnProperty('overseerId')) {
                    db.collection('users').find({
                        _id: safeObjectId(place.overseerId)
                    }, {
                        '_id': 1,
                        'firstName': 1,
                        'lastName': 1
                    }).toArray(function(err, trusted) {
                        place.overseerId = trusted.pop();
                        callback(hauResponse.createOkResponse(place));
                    });
                } else if (place === undefined) {
                    callback(hauResponse.createNotFoundResponse(id));
                } else {
                    callback(hauResponse.createOkResponse(place));
                }
            }
        });
    }

    function getAllPairs(callback) {
        db.collection('pairs').find({}).toArray(function(errf, pairs) {
            if (errf) {
                callback(hauResponse.createErrorResponse(errf));
            } else {
                callback(hauResponse.createOkResponse(pairs));
            }
        });
    }

    function postNewUser(user, callback) {
        if (hauValidator.validateUser(user)) {
            db.collection('users').find({
                'username': user.username
            }).count(function(err, counter) {
                if (err) {
                    callback(hauResponse.createErrorResponse(err));
                } else {
                    if (counter === 0) {
                        db.collection('users').insert(user, (err, result) => {
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

    function postNewDog(dog, callback) {
        if (!hauValidator.validateDog(dog)) {
            callback(hauResponse.createBadRequestResponse());
        } else {
            dog.dateBirth = new Date(dog.dateBirth);
            db.collection('dogs').insert(dog, (err, result) => {
                if (err) {
                    callback(hauResponse.createErrorResponse(err));
                } else {
                    console.log(result);
                    callback(hauResponse.createOkResponse(result));
                }
            });
        }
    }

    function postNewPlace(place, callback) {
        if (!hauValidator.validatePlace(place)) {
            callback(hauResponse.createBadRequestResponse());
        } else {
            db.collection('places').insert(place, (err, result) => {
                if (err) {
                    callback(hauResponse.createErrorResponse(err));
                } else {
                    callback(hauResponse.createOkResponse(result));
                }
            });
        }
    }

    function postNewVisit(visit, callback) {
        if (!hauValidator.validateVisit(visit)) {
            callback(hauResponse.createBadRequestResponse());
        } else {
            visit.visitTime = new Date(visit.visitTime);
            db.collection('visits').save(visit, (err, result) => {
                if (err) {
                    callback(hauResponse.createErrorResponse(err));
                } else {
                    callback(hauResponse.createOkResponse(result));
                }
            });
        }
    }


    function postNewPair(ids, callback) {
        var pair = {};

        if (!hauValidator.validatePair(ids)) {
            callback(hauResponse.createBadRequestResponse());
        } else {
            db.collection('users').find({
                _id: safeObjectId(ids.userId)
            }, {
                '_id': 1,
                'firstName': 1,
                'lastName': 1
            }).toArray((err, user) => {
                if (err) {
                    callback(hauResponse.createErrorResponse(err));
                } else {
                    db.collection('dogs').find({
                        _id: safeObjectId(ids.dogId)
                    }, {
                        '_id': 1,
                        'nameFull': 1,
                        'nameNickname': 1
                    }).toArray((errs, dog) => {
                        if (errs) {
                            callback(hauResponse.createErrorResponse(errs));
                        } else {
                            pair.user = user.pop();
                            pair.dog = dog.pop();

                            if (pair.user === undefined) {
                                callback(hauResponse.createNotFoundResponse(ids.userId));
                            } else if (pair.dog === undefined) {
                                callback(hauResponse.createNotFoundResponse(ids.dogId));
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

    function getWholeCollection(collectionName, callback) {
        db.collection(collectionName).find({}, {
            password: 0
        }).toArray(function(err, docs) {
            if (err) {
                callback(hauResponse.createErrorResponse(err));
            } else {
                callback(hauResponse.createOkResponse(docs));
            }
        });
    }

    function deleteUserById(userid, callback) {
        db.collection('users').deleteOne({
            _id: safeObjectId(userid)
        }, (err, response) => {
            if (err) {
                callback(hauResponse.createErrorResponse(err));
            } else {
                if (response.deletedCount === 1) {
                    db.collection('pairs').deleteMany({
                        'user._id': safeObjectId(userid)
                    }, (errs, r) => {
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

    function deleteDogById(dogid, callback) {
        db.collection('dogs').deleteOne({
            _id: safeObjectId(dogid)
        }, (err, response) => {
            if (err) {
                callback(hauResponse.createErrorResponse(err));
            } else {
                if (response.deletedCount === 1) {
                    db.collection('pairs').deleteMany({
                        'dog._id': safeObjectId(dogid)
                    }, (errs, r) => {
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

    function deletePlaceById(placeid, callback) {
        db.collection('places').deleteOne({
            _id: safeObjectId(placeid)
        }, (err, response) => {
            if (err) {
                callback(hauResponse.createErrorResponse(err));
            } else {
                if (response.deletedCount === 1) {
                    callback(createOkResponse(response));
                } else {
                    callback(hauResponse.createNotFoundResponse(placeid));
                }
            }
        });
    }

    function deletePairById(pairid, callback) {
        db.collection('pairs').deleteOne({
            _id: safeObjectId(pairid)
        }, (err, response) => {
            if (err) {
                callback(hauResponse.createErrorResponse(err));
            } else {
                if (response.deletedCount === 1) {
                    callback(createOkResponse(response));
                } else {
                    callback(hauResponse.createNotFoundResponse(pairid));
                }
            }
        });
    }

    function deleteVisitById(visitId, callback) {
        db.collection('visits').deleteOne({
            _id: safeObjectId(visitId)
        }, (err, response) => {
            if (err) {
                callback(hauResponse.createErrorResponse(err));
            } else {
                if (response.deletedCount === 1) {
                    callback(createOkResponse(response));
                } else {
                    callback(hauResponse.createNotFoundResponse(visitId));
                }
            }
        });
    }

    exports.init = init;
    exports.getWholeCollection = getWholeCollection;
    exports.getUserById = getUserById;
    exports.getDogById = getDogById;
    exports.getPlaceById = getPlaceById;
    exports.getAllPairs = getAllPairs;
    exports.postNewUser = postNewUser;
    exports.postNewDog = postNewDog;
    exports.postNewPlace = postNewPlace;
    exports.postNewVisit = postNewVisit;
    exports.postNewPair = postNewPair;
    exports.deleteUserById = deleteUserById;
    exports.deleteDogById = deleteDogById;
    exports.deletePlaceById = deletePlaceById;
    exports.deletePairById = deletePairById;
    exports.deleteVisitById = deleteVisitById;
}());
