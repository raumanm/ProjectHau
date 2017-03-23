/*jslint node:true */
(function () {
    "use strict";
    let express, app, hauMongo, bodyParser,
        hauDogs, hauUsers, hauPairs, hauPlaces, hauVisits;

    function logger(req, res, next) {
        console.log(new Date(), req.ip, req.method, req.url);
        next();
    }  

    express = require('express');
    bodyParser = require('body-parser');
	hauMongo = require('./hau-db');
	hauDogs = require('./dogs/hau-dogs');
	hauUsers = require('./users/hau-users');
	hauPairs = require('./pairs/hau-pairs');
	hauPlaces = require('./pairs/hau-pairs');
	hauVisits = require('./visits/hau-visits');
	
    app = express();

    app.use( bodyParser.json() );
    app.set('json spaces', 2);
    app.enable('trust proxy');
    app.use(logger);

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
