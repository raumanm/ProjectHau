/*jslint node:true */
(function() {
    "use strict";

    let MongoDB, MongoClient, ObjectId, db, safeObjectId;

    MongoDB = require('mongodb');
    MongoClient = MongoDB.MongoClient;
    ObjectId = MongoDB.ObjectId;

    const objectIdRe = /^[0-9a-fA-F]{24}$/;
    safeObjectId = s => objectIdRe.test(s) ? new ObjectId(s) : null;

    function init() {
        // Initialize connection once
        MongoClient.connect("mongodb://localhost:27017/hauDb", (err, database) => {
            if (err) throw err;
            db = database;
            exports.DB = db;
        });
    }

    exports.ObjectID = ObjectId;
    exports.safeObjectId = safeObjectId;
    init();
}());