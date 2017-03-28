/*jslint node:true */
(function (){
    "use strict";
    let hauDB, safeObjectId, express, validator, app, hauResponse, jsonWebToken;

    express = require('express');
    app = module.exports = express();
    jsonWebToken = require('jsonwebtoken');

    hauDB = require('../hau-db');
    validator = require('../users/validate-user');
    hauResponse = require('../hau-response');

    safeObjectId = hauDB.safeObjectId;

    app.route("\/authentication\/:id([0-9a-fA-F]{24})(\/)?$")
    .all((req, res, next) => {
        next();
    })
    .post((req, res, next) => {
        getById(req.params.id, (user) => {
            res.json(user);
        });
    });

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
}());

module.exports = {
    'secret': 'superduperultradifficultysecretpecter69'
}