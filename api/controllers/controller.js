'use strict';

var mongoose = require('mongoose'),
  geoOp = require('../models/model').GeoData,
  togeojson = require ('@mapbox/togeojson'),
  fs = require ('fs'),
  DOMParser = require('xmldom').DOMParser;

exports.post = function(req, res) {
  var file = req.file;
  if (file){
    console.log("Uploaded " + file.originalname + " to " + file.path);
    fs.readFile(file.path, function(err, data){
        var parseFile = data.toString();
        var gpx = new DOMParser().parseFromString(parseFile);
        var converted = togeojson.gpx(gpx);
        // mapping the converted data to a model
        console.log(converted);
        var geoData = new geoOp(converted);
        geoData.save().then(function(geodata){
            res.send(geodata);
        });
      });
  }else{
    console.log("No File");
    res.sendStatus(500);
  }
};

exports.get = function(req, res) {
  geoOp.find({}, function(err, data) {
    if (err)
      res.send(err);
    res.json(data);
  });
};
