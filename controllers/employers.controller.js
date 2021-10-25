const Employers = require("../models/employers.model.js");

exports.getEmployers = (req, res) => {
  let limit = req.query.limit ? parseInt(req.query.limit): 10;
  Employers.getEmployers(limit, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving employers."
      });
    else res.send({size: data.length, data: data});
  })
}

exports.getEmployerByField = (req, res) => {
  if (JSON.stringify(req.query) === "{}"){
    res.status(400).send({message: "No query parameters were sent"})
  } else {
    let queryParams = req.query;
    Employers.getEmployerByField(queryParams, (err, data) => {
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

exports.updateEmployerByID = (req, res) => {
  if (!req.body){
    res.status(400).send({message: "No fields to update were sent"})
  } else {
    let id = req.params.employerID;
    let update = req.body;
    Employers.updateByID(id, update, (err, data) => {
      if (err){
        console.log(err.message);
        res.status(500).send({
          message: err.message || "Error occurred while updating employer."
        });
      } else {
        res.send({data: data});
      }
    })
  }
}

exports.addEmployer = (req, res) => {
  if (!req.body) {
    res.status(400).send({message: "Invalid request. No body sent to insert"})
  }
  var newEmployer = req.body;
  Employer.addEmployer(newEmployer, (err, data) => {
    if (err){
      console.log(err.message);
      res.status(500).send({
        message: err.message || "Error occurred while adding new employer."
      });
    } else {
      res.send({data: data});
    }
  })
}
