const Functions = require("../models/functions.model.js");

exports.getFunctions = (req, res) => {
  let limit = req.query.limit ? parseInt(req.query.limit): 10;
  Functions.getFunctions(limit, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving functions."
      });
    else res.send({size: data.length, data: data});
  })
}

exports.getFunctionByField = (req, res) => {
  if (JSON.stringify(req.query) === "{}"){
    res.status(400).send({message: "No query parameters were sent"})
  } else {
    let queryParams = req.query;
    Functions.getFunctionByField(queryParams, (err, data) => {
      if (err) {
        if (err.kind && err.kind === "not_found"){
          res.status(500).send({message: "Function not found"});
        } else {
          res.status(500).send({message: "Error occurred while retrieving functions."});
        }
      } else res.send({size: data.length, data: data});
    })
  }
}

exports.addFunction = (req, res) => {
  if (JSON.stringify(req.query) === "{}"){
    res.status(400).send({message: "No fields to insert were sent"})
  } else {
    let queryParams = req.query;
    Functions.addFunction(queryParams, (err, data) => {
      if (err) {
        res.status(500).send({message: "Error occurred when inserting record."})
      } else {
        res.send({data: data});
      }
    })
  }
}
