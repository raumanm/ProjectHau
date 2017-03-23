/*jslint node:true */
(function() {
    "use strict";

    let MongoDB, MongoClient, ObjectId, db, safeObjectId;

    MongoDB = require('mongodb');
	
    MongoClient = MongoDB.MongoClient;
    ObjectId = MongoDB.ObjectId;

    const objectIdRe = /^[0-9a-fA-F]{24}$/;
    safeObjectId = s => objectIdRe.test(s) ? new ObjectId(s) : null;

    module.exports.init = function (callback) {
        MongoClient.connect("mongodb://localhost:27017/hauDb", (err, client) => {
            module.exports.db = client;
			callback(err);
        });
    }

    exports.ObjectID = ObjectId;
    exports.safeObjectId = safeObjectId;
}());