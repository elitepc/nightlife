'use strict';

var _ = require('lodash');
var Place = require('./place.model');

// Get list of places
exports.index = function(req, res) {
  Place.find(function (err, places) {
    if(err) { return handleError(res, err); }
    return res.status(200).json(places);
  });
};

// Get list of places from Yelp
exports.yelp = function(req, res) {

  var yelp = require("yelp").createClient({
    consumer_key: process.env.YELP_KEY,
    consumer_secret: process.env.YELP_SECRET,
    token: process.env.YELP_TOKEN,
    token_secret: process.env.YELP_TOKEN_SECRET
  });

  // See http://www.yelp.com/developers/documentation/v2/search_api
  yelp.search({term: "bar", location: req.params.search}, function(error, data) {
    console.log("error", error);
    console.log("data", data);
    if(error){
      return res.status(400).json(JSON.parse(error.data).error.text);
    }

    return res.json(data);
  });

};

// Get a single place
exports.show = function(req, res) {
  Place.findById(req.params.id, function (err, place) {
    if(err) { return handleError(res, err); }
    if(!place) { return res.status(404).send('Not Found'); }
    return res.json(place);
  });
};

// Creates a new place in the DB.
exports.create = function(req, res) {
  Place.create(req.body, function(err, place) {
    if(err) { return handleError(res, err); }
    return res.status(201).json(place);
  });
};

// Updates an existing place in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Place.findById(req.params.id, function (err, place) {
    if (err) { return handleError(res, err); }
    if(!place) { return res.status(404).send('Not Found'); }
    var updated = _.merge(place, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.status(200).json(place);
    });
  });
};

// Deletes a place from the DB.
exports.destroy = function(req, res) {
  Place.findById(req.params.id, function (err, place) {
    if(err) { return handleError(res, err); }
    if(!place) { return res.status(404).send('Not Found'); }
    place.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.status(204).send('No Content');
    });
  });
};

function handleError(res, err) {
  return res.status(500).send(err);
}
