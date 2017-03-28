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
            
            if(user.password == req.body.password) {
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

    function getById(id, callback) {

        hauDB.db.collection('users').find({ _id: safeObjectId(id)}, {}).toArray(function(err, docs) {
            let user;

            if (err) {
                callback(hauResponse.createErrorResponse(err));
            } else {
                user = docs.pop();
                callback(user);
            }
        });
    }
}());
