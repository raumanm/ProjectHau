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

    app.route("\/authenticate")
    .all((req, res, next) => {
        next();
    })
    .post((req, res, next) => {
        getByName(req.body.username, (err, user) => {
            
            //Check whether there was an error while fetching user data
            if(err) res.send(hauResponse.createErrorResponse(err));
            else {
                if(user) {
                    if(user.password == req.body.password) {
                        //If authentication succeeded
                        var token = jsonWebToken.sign(user, app.get('authenticationSecret'), {
                            expiresIn : 60*60*24
                        });
                        res.json(hauResponse.createAuthenticationSucceededResponse(token, user._id, user.accessLevel));
                    } else {
                        //If password is wrong
                        res.send(hauResponse.createAuthenticationErrorResponse());
                    }
                } else {
                    //If user does not exist
                    res.send(hauResponse.createAuthenticationErrorResponse());
                }
            }
        });
    });
    
    app.route("\/checktoken")
    .all((req, res, next) => {
        next();
    })
    .post((req, res, next) => {
        //Require authentication token from requests body or query
        var token = req.body.token;
        if(token) {
            jsonWebToken.verify(token, app.get('authenticationSecret'), (err, user)=> {
                if(err) {
                    res.json(hauResponse.createUnauthorizedResponse());
                } else {
                    res.json(hauResponse.createAuthenticationSucceededResponse(token, user._id, user.accessLevel));
                }
            });
        } else {
            res.json(hauResponse.createUnauthorizedResponse());
        }
    });

    //Returns user by given name
    function getByName(username, callback) {

        hauDB.db.collection('users').find({ username: username}, {}).toArray(function(err, docs) {
            if (err) callback(err, null);
            callback(null, docs.pop());
        });
    }
}());
