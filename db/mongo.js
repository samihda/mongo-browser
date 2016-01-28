var MongoClient = require('mongodb').MongoClient;
var url = 'mongodb://localhost:27017';

exports.listDatabases = function (cb) {
  MongoClient.connect(url, function(err, db) {
    var adminDb = db.admin();
    adminDb.listDatabases(function(err, obj) {
      if (err) {
        cb(err);
      }
      cb(null, obj);
    });
  });
};

exports.listCollections = function (dbName, cb) {
  MongoClient.connect(url + '/' + dbName, function(err, db) {
    db.listCollections().toArray(function(err, obj) {
      if (err) {
        cb(err);
      }
      cb(null, obj);
    });
  });
};

exports.listDocuments = function (dbName, colName, cb) {
  MongoClient.connect(url + '/' + dbName, function(err, db) {
    db.collection(colName).find({}).toArray(function(err, docs) {
      if (err) {
        cb(err);
      }
      cb(null, docs);
    });
  });
};
