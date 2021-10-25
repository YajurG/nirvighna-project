const Locations = require('../models/location.model.js');
const dbConfig = require("../config/db.config.js");
var mysql = require('mysql');

exports.getCities = (req, res) => {
  let limit = req.query.limit ? parseInt(req.query.limit) : 5;
  Locations.getCities(limit, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving cities."
      });
    else res.send({data: data});
  })
  /*if (JSON.stringify(req.query) === '{}'){
    Locations.getCities((err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving cities."
        });
      else res.send({data: data});
    })
  } else {
    let queryParams = req.query;
    console.log(queryParams);
    Locations.getCityID(queryParams, (err, data) => {
      if (err) {
        console.log(err);
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving cities."
        });
      } else res.send({data: data});
    })
  }*/

}

exports.getCityByField = (req, res) => {
  if (JSON.stringify(req.query) === "{}"){
    res.status(400).send({message: "No query parameters were sent"})
  } else {
    let queryParams = req.query;
    let fields = [];
    let values = [];
    for (var key in queryParams) {
      fields.push(key);
      values.push(queryParams[key]);
    }
    Locations.getCityByField(fields, values, (err, data) => {
      if (err){
        console.log(err);
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving cities."
        });
      } else res.send({data: data});
    })
  }
}

exports.getCitiesByCountryID = (req, res) => {
  Locations.getCitiesByCountryID(req.params.countryID, (err, data) => {
    if (err){
      console.log(err);
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving cities."
      });
    } else res.send({data: data});
  })
}

exports.getCountries = (req, res) => {
  let limit = req.query.limit ? parseInt(req.query.limit) : 5;
  Locations.getCountries(limit, (err, data) => {
    if (err){
      console.log(err);
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving countries."
      });
    } else res.send({data: data});
  })
}

exports.getCountryByField = (req, res) => {
  if (JSON.stringify(req.query) === "{}"){
    res.status(400).send({message: "No query parameters were sent"})
  } else {
    let queryParams = req.query;
    let fields = [];
    let values = [];
    for (var key in queryParams) {
      fields.push(key);
      values.push(queryParams[key]);
    }
    Locations.getCountryByField(fields, values, (err, data) => {
      if (err){
        console.log(err);
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving cities."
        });
      } else res.send({data: data});
    })
  }
}
