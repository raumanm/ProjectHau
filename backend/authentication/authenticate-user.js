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

    app.route("\/authentication")
    .all((req, res, next) => {
        next();
    })
    .post((req, res, next) => {
        getByName(req.body.username, (user) => {
            
            if(user.password === req.body.password) {
                res.json({
                    success: true,
                    user_password: user.password,
                    requested_password: req.body.password
                });
            } else {
                res.json({
                    success: false,
                    user_password: user.password,
                    requested_password: req.body.password
                });
            }
        });
    });

    function getByName(username, callback) {

        hauDB.db.collection('users').find({ username: username}, {}).toArray(function(err, docs) {
            if (err) callback(hauResponse.createErrorResponse(err));
            callback(docs.pop());
        });
    }
}());
