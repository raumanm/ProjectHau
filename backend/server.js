/*jslint node:true */
(function () {
    "use strict";
    let express, app, hauMongo, bodyParser, authentication,
        hauDogs, hauUsers, hauPairs, hauPlaces, hauVisits;

    function logger(req, res, next) {
        console.log(new Date(), req.ip, req.method, req.url);
        next();
    }

    express = require('express');
    bodyParser = require('body-parser');
	hauMongo = require('./hau-db');
    hauResponse = require('./hau-response');

    //Authentication resource
    authentication = require('./authentication/authenticate-user');
	
    //Rest resources
    hauDogs =   require('./dogs/hau-dogs');
	hauUsers =  require('./users/hau-users');
	hauPairs =  require('./pairs/hau-pairs');
	hauPlaces = require('./places/hau-places');
	hauVisits = require('./visits/hau-visits');

    //Set up application
    app = express();
    app.set('authenticationSecret', require('./authentication/authentication-config').secret);
    app.use( bodyParser.json() );
    app.set('json spaces', 2);
    app.enable('trust proxy');
    app.use(logger);
    app.use(authentication); //Set authentication route to app

    //JsonWebToken used for user authentication
    var jsonWebToken = require('jsonwebtoken');
    var apiRoute = express.Router();

    //Verify that user is logged in correctly
    app.use((req, res, next)=> {
        
        //Require authentication token from requests body or query
        var token = req.body.token || req.query.token || req.headers['x-access-token'];
        
        if(token) {
            jsonWebToken.verify(token, app.get('authenticationSecret'), (err, decoded)=> {
                if(err) {
                    res.json(hauResponse.createUnauthorizedResponse());
                } else {
                    req.decoded = decoded;
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
    app.use(apiRoute);

	hauMongo.init(function (err) {
		if (err) throw err;
		app.listen(8080);
	});
}());
