/*jslint node:true */
(function () {
    "use strict";
    let express, app, hauMongo, bodyParser, authentication,
        hauDogs, hauUsers, hauPairs, hauPlaces, hauVisits,
        hauResponse;

    function logger(req, res, next) {
        console.log(new Date(), req.ip, req.method, req.url);
        next();
    }

    express = require('express');
    bodyParser = require('body-parser');
	hauMongo = require('./hauapi/hau-db');
    hauResponse = require('./hauapi/hau-response');

    //Authentication resource
    authentication = require('./hauapi/authentication/authenticate-user');

    //Rest resources
    hauDogs =   require('./hauapi/dogs/hau-dogs');
	hauUsers =  require('./hauapi/users/hau-users');
	hauPairs =  require('./hauapi/pairs/hau-pairs');
	hauPlaces = require('./hauapi/places/hau-places');
	hauVisits = require('./hauapi/hau-visits');

    //Set up application
    app = express();
    app.set('authenticationSecret', require('./hauapi/authentication/authentication-config').secret);
    app.use( bodyParser.json() );
    app.set('json spaces', 2);
    app.enable('trust proxy');
    app.use(logger);
    app.use("/hauapi", authentication); //Set authentication route to app

    //JsonWebToken used for user authentication
    var jsonWebToken = require('jsonwebtoken');
    var apiRoute = express.Router();

    //Verify that user is logged in correctly
    apiRoute.use((req, res, next)=> {

        //Require authentication token from requests body or query
        var token = req.body.token || req.query.token || req.headers['x-access-token'];

        if(token) {
            jsonWebToken.verify(token, app.get('authenticationSecret'), (err, user)=> {
                if(err) {
                    res.json(hauResponse.createUnauthorizedResponse());
                } else {
                    /*
                    Add user id and access level to request and response so
                    users gredentials can be defined and right
                    data can be fetched.
                    */
                    req.userData = {
                        _id: user._id,
                        accessLevel: user.accessLevel
                    };
                    res.token = token;
                    res._id = user._id;
                    res.accessLevel = user.accessLevel;
                    next();
                }
            });
        } else {
            res.json(hauResponse.createUnauthorizedResponse());
        }
    });

    //Set Rest resources under apiRoute
    apiRoute.use(hauDogs);
    apiRoute.use(hauUsers);
    apiRoute.use(hauPairs);
    apiRoute.use(hauPlaces);
    apiRoute.use(hauVisits);

    app.use("/", express.static('public_html'));
    app.use("/hauapi", apiRoute);

	hauMongo.init(function (err) {
		if (err) throw err;
		app.listen(8080);
	});
}());
