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

    authentication = require('./authentication/authenticate-user');
	hauDogs = require('./dogs/hau-dogs');
	hauUsers = require('./users/hau-users');
	hauPairs = require('./pairs/hau-pairs');
	hauPlaces = require('./places/hau-places');
	hauVisits = require('./visits/hau-visits');

    app = express();
    app.set('authenticationSecret', require('./authentication/authentication-config'));

    app.use( bodyParser.json() );
    app.set('json spaces', 2);
    app.enable('trust proxy');
    app.use(logger);

    app.use(authentication);
    app.use(hauDogs);
    app.use(hauUsers);
    app.use(hauPairs);
    app.use(hauPlaces);
    app.use(hauVisits);

	hauMongo.init(function (err) {
		if (err) throw err;

		app.listen(8080);
	});


}());
