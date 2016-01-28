var express = require('express');
var db = require('../db/mongo');
var router = express.Router();

router.get('/', function(req, res, next) {
  db.listDatabases(function (err, result) {
  	if (err) {
  	  console.error(err);
  	}
	res.render('index', { databases: result.databases });
  });
});

router.get('/:name', function(req, res, next) {
  db.listCollections(req.params.name, function (err, result) {
  	if (err) {
      console.error(err);
  	}
    res.render('collections', { dbName: req.params.name, collections: result });
  });
});

router.get('/:dbName/:colName', function(req, res, next) {
  db.listDocuments(req.params.dbName, req.params.colName, function (err, result) {
  	if (err) {
      console.error(err);
  	}
    res.render('documents', {
      collection: req.params.colName,
      documents: JSON.stringify(result, null, 2)
    });
  });
});

module.exports = router;
