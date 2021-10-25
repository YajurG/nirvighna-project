const Industries = require("../models/industries.model.js");

exports.getIndustries = (req, res) => {
  let limit = req.query.limit ? parseInt(req.query.limit): 10;
  Industries.getIndustries(limit, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving industries."
      });
    else res.send({size: data.length, data: data});
  })
}

exports.getIndustryByField = (req, res) => {
  if (JSON.stringify(req.query) === "{}"){
    res.status(400).send({message: "No query parameters were sent"})
  } else {
    let queryParams = req.query;
    Industries.getIndustryByField(queryParams, (err, data) => {
      if (err) {
        if (err.kind && err.kind === "not_found"){
          res.status(500).send({message: "Industry not found"});
        } else {
          res.status(500).send({message: "Error occurred while retrieving industries."});
        }
      } else res.send({size: data.length, data: data});
    })
  }
}

exports.addIndustry = (req, res) => {
  if (JSON.stringify(req.query) === "{}"){
    res.status(400).send({message: "No fields to insert were sent"})
  } else {
    let queryParams = req.query;
    Industries.addIndustry(queryParams, (err, data) => {
      if (err) {
        res.status(500).send({message: "Error occurred when inserting record."})
      } else {
        res.send({data: data});
      }
    })
  }
}
