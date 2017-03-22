/*jslint node:true */
(function () {
    "use strict";
    var express, app, server, hauMongo, bodyParser;

    function logger(req, res, next) {
        console.log(new Date(), req.ip, req.method, req.url);
        next();
    }

    express = require('express');
    hauMongo = require('./hau-mongo');
    bodyParser = require('body-parser');
    app = express();

    app.use( bodyParser.json() );
    app.set('json spaces', 2);
    app.enable('trust proxy');
    app.use(logger);

    app.get("\/:collection(places|users|dogs)(\/)?$", function(req, res) {
        hauMongo.getWholeCollection(req.params.collection, (docs) => sendResponse(res, docs));
    });

    app.get("\/pairs(\/)?$", function(req, res) {
        hauMongo.getAllPairs((pairs) => sendResponse(res, pairs));
    });

    app.get("\/users\/:id([0-9a-fA-F]{24})\/$", function (req, res) {
        hauMongo.getUserById(req.params.id, (user) => sendResponse(res, user));
    });

    app.get("\/dogs\/:id([0-9a-fA-F]{24})\/$", function (req, res) {
        hauMongo.getDogById(req.params.id, (dog) => sendResponse(res, dog));
    });

    app.get("\/places\/:id([0-9a-fA-F]{24})\/$", function (req, res) {
        hauMongo.getPlaceById(req.params.id, (place) => sendResponse(res, place));
    });

    app.post("\/pairs\/userid\/:userId([0-9a-fA-F]{24})\/dogid\/:dogId([0-9a-fA-F]{24})(\/)?$", function (req, res) {
        hauMongo.postNewPair(req.params, result => sendResponse(res, result));
    });

    app.post("\/users(\/)?$", function(req, res) {
        if (req.get('Content-Type') === 'application/json') {
            hauMongo.postNewUser(req.body, (result) => sendResponse(res, result));
        }
    });

    app.post("\/dogs(\/)?$", function(req, res) {
        if (req.get('Content-Type') === 'application/json') {
            hauMongo.postNewDog(req.body, (result) => sendResponse(res, result));
        }
    });

    app.post("\/places(\/)?$", function(req, res) {
        if (req.get('Content-Type') === 'application/json') {
            hauMongo.postNewPlace(req.body, (result) => sendResponse(res, result));
        }
    });

    app.post("\/visits(\/)?$"), function(req, res) {
        if (req.get('Content-Type') === 'application/json') {
            hauMongo.postNewVisit(req.body, (result) => sendResponse(res, result));
        }
    }

    app.delete("\/users\/:id([0-9a-fA-F]{24})\/$", function (req, res) {
        hauMongo.deleteUserById(req.params.id, (user) => sendResponse(res, user));
    });

    app.delete("\/dogs\/:id([0-9a-fA-F]{24})\/$", function (req, res) {
        hauMongo.deleteDogById(req.params.id, (dog) => sendResponse(res, dog));
    });

    app.delete("\/places\/:id([0-9a-fA-F]{24})\/$", function (req, res) {
        hauMongo.deletePlaceById(req.params.id, (place) => sendResponse(res, place));
    });

    app.delete("\/pairs\/:id([0-9a-fA-F]{24})\/$", function (req, res) {
        hauMongo.deletePairById(req.params.id, (dog) => sendResponse(res, dog));
    });

    app.delete("\/visits\/:id([0-9a-fA-F]{24})\/$", function (req, res) {
        hauMongo.deleteVisitById(req.params.id, (place) => sendResponse(res, place));
    });

    var server = app.listen(8080, function() {
        hauMongo.init();
        console.log('Server listening\n');
    });

    function sendResponse(res, data) {

        if (data.hasOwnProperty('status')) {
            res.status(data.status);
        }
        if (data.hasOwnProperty('content')) {
            res.setHeader('Content-Type', data.content);
        }

        res.send(data.data);
    }
}());
