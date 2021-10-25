const Candidate = require("../models/candidate.model.js");

exports.create = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Request cannot be empty."
    })
  }
  /*const newCandidate = Candidate({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    currentEmployerID: req.body.currentEmployerID,
    previousEmployerID: req.body.previousEmployerID,
    jobTitle: req.body.jobTitle,
    primaryEmail: req.body.primaryEmail,
    secondaryEmail: req.body.secondaryEmail,
    homeContact: req.body.homeContact,
    mobileContact: req.body.mobileContact,
    officeContact: req.body.officeContact,
    homeAddress: req.body.homeAddress,
    gender: req.body.gender,
    education: req.body.education,
    nationalID: req.body.nationalID,
    workExperience: req.body.workExperience,
    countryID: req.body.countryID,
    cityID: req.body.cityID,
    functionID: req.body.functionID,
    industryID: req.body.industryID,
    salary: req.body.salary,
    notice_period: req.body.notice_period
  })*/
  let newCandidate = req.body;
  Candidate.create(newCandidate, (err, data) => {
    if (err) {
      res.status(500).send({
        message:
          err.message || "Some error occurred while adding the candidate."
      });
    } else res.send({data: data})
  })
}

exports.getCandidates = (req, res) => {
  let limit = req.query.limit ? parseInt(req.query.limit) : 10;
  Candidate.getAll(limit, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving candidates."
      });
    else res.send({data: data});
  })

  /*if (JSON.stringify(req.query) === '{}' ){
    let limit = req.query.limit ? req.query.limit : 10;
    Candidate.getAll(limit, (err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving candidates."
        });
      else res.send(data);
    })
  }*/
}

exports.getCandidatesByField = (req, res) => {
  if (JSON.stringify(req.query) === "{}"){
    res.status(400).send({message: "No query parameters were sent"})
  } else {
    let queryParams = req.query;
    let fields = [];
    let values = []
    for (var key in queryParams) {
      fields.push(key);
      values.push(queryParams[key]);
    }
    Candidate.getByField(fields, values, (err, data) => {
      if (err){
        res.status(500).send({
          message: err.message || "Error occurred."
        });
      } else {
        res.send({size: data.length, data: data});
      }
    })
  }
}

exports.getByID = (req, res) => {
  Candidate.getByID(req.params.candidateID, (err, data) => {
    if (err){
      res.status(500).send({
        message: err.message || "Error occurred."
      });
    } else {
      res.send(data);
    }

  })
}

exports.updateByID = (req, res) => {
    //console.log(req.body);
    if (Object.keys(req.body).length === 0) {
      res.status(400).send({message: "No fields to update were sent"});
    } else {
      let id = req.params.candidateID;
      let update = req.body;

      Candidate.updateByID(id, update, (err, data) => {
        if (err){
          res.status(500).send({
            message: err.message || "Error occurred while updating candidate."
          });
        } else {
          res.send({data: data});
        }
      })
    }

}

exports.delete = (req, res) => {
  Candidate.remove(req.params.candidateID, (err, data) => {
    if (err){
      res.status(500).send({
        message: err.message || "Error occurred."
      });
    } else {
      res.send({message: "Deleted successfully", data: data});
    }
  })
}
