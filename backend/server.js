/*jslint node:true */
(function () {
    "use strict";
    let express, app, server, hauMongo, bodyParser, hauDogs;

    function logger(req, res, next) {
        console.log(new Date(), req.ip, req.method, req.url);
        next();
    }  

    express = require('express');
    bodyParser = require('body-parser');
	hauMongo = require('./hau-db');
	hauDogs = require('./dogs/hau-dogs');
	
	
    app = express();

    app.use( bodyParser.json() );
    app.set('json spaces', 2);
    app.enable('trust proxy');
    app.use(logger);

    app.use(hauDogs);
	

	hauMongo.init(function (err) {
		if (err) throw err;
		
		app.listen(8080);
	});


}());
