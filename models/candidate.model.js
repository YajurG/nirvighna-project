  var getConnection = require('./db.connection.js');

const Candidate = (candidate) => {
    this.firstName = candidate.firstName;
    this.lastName = candidate.lastName;
    this.currentEmployerID = candidate.currentEmployerID;
    this.previousEmployerID = candidate.previousEmployerID;
    this.jobTitle = candidate.jobTitle;
    this.primaryEmail = candidate.primaryEmail;
    this.secondaryEmail = candidate.secondaryEmail;
    this.homeContact = candidate.homeContact;
    this.mobileContact = candidate.mobileContact;
    this.officeContact = candidate.officeContact;
    this.homeAddress = candidate.homeAddress;
    this.gender = candidate.gender;
    this.education = candidate.education;
    this.nationalID = candidate.nationalID;
    this.workExperience = candidate.workExperience;
    this.countryID = candidate.countryID;
    this.cityID = candidate.cityID;
    this.functionID = candidate.functionID;
    this.industryID = candidate.industryID;
    this.salary = candidate.salary;
    this.notice_period = candidate.notice_period;
}

Candidate.create = (newCandidate, result) => {
  getConnection((err, connection) => {
    if (err) {
      console.log(err);
      result(err, null);
      return;
    } else {
      connection.query("INSERT INTO candidates SET ?", newCandidate, (err, res) => {
        connection.release();
        if (err) {
          console.log("error: ", err);
          result(err, null);
          return;
        }
        result(null, { id: res.insertId, ...newCandidate });
      });
    }
  })

};

Candidate.getByID = (candidateID, result) => {

  getConnection((err, connection) => {
    if (err) {
      console.log(err);
      result(err, null);
      return;
    } else {
      connection.query("SELECT * FROM candidates where id = ?", candidateID, (err, res) => {
        connection.release();
        if (err) {
          console.log("error: ", err);
          result(err, null);
          return;
        }
        if (res.length){
          console.log("Found candidate: ", res[0]);
          console.log(res);
          result(null, res[0]);
          return;
        }

        // id not found
        console.log("ID not found");
        result({kind: "not_found"}, null);
      });
    }
  })


}

Candidate.getAll = (limit, result) => {

  getConnection((err, connection) => {
    if (err) {
      console.log(err);
      result(err, null);
      return;
    } else {
      connection.query("SELECT * FROM candidates LIMIT ?", limit, (err, res) => {
        connection.release();
        if (err) {
          console.log("error: ", err);
          result(err, null);
          return;
        }
        result(null, res);
      })
    }
  })
}


Candidate.getByField = (fields, values, result) => {
    getConnection((err, connection) => {
      if (err) {
        console.log(err);
        result(err, null);
        return;
      } else {
        console.log(fields);
        console.log(values[0]);
        let query = "SELECT * FROM candidates WHERE (??) IN (?)";
        let parameters = [];
        parameters.push(fields[0]);
        parameters.push(values[0]);
        console.log(parameters);

        for (let i = 1; i < fields.length; i++){
          query += " AND (??) IN (?)";
          parameters.push(fields[i], values[i]);
        }
        console.log(parameters);
        connection.query(query, parameters, (err, res) => {
          connection.release();
          if (err) {
            console.log(err);
            result(err, null);
            return;
          }

          if (res.length){
            console.log(res);
            result(null, res);
            return;
          }
          console.log("ID not found");
          console.log(res);
          result({kind: "not_found"}, null);
        })
      }
    })
}

Candidate.updateByID = (candidateID, update, result) => {
  getConnection((err, connection) => {
    if (err) {
      console.log(err);
      result(err, null);
      return;
    } else {
      let query = "UPDATE candidates SET ?? = ?";
      let parameters = [];
      for (var key in update) {
        parameters.push(key, update[key]);
      }

      for (let i = 1; i < Object.keys(update).length; i++){
        query += ", ?? = ?";
      }
      query += " WHERE id = ?";
      parameters.push(candidateID);
      connection.query(query, parameters, (err, res) => {
        connection.release();
        if (err) {
          console.log("error: ", err);
          result(err, null);
          return;
        }

        if (res.affectedRows == 0){
          console.log("No rows found");
          result({ kind: "not_found" }, null);
          return;
        }
        let data = {data: {id: candidateID, ...update}};
        result(null, data);
      })
    }
  })


}

Candidate.remove = (candidateID, result) => {

  getConnection((err, connection) => {
    if (err) {
      console.log(err);
      result(err, null);
      return;
    } else {
      connection.query("DELETE FROM candidates WHERE id = ?", candidateID, (err, res) => {
        connection.release();
        if (err) {
          console.log("error: ", err);
          result(null, err);
          return;
        }

        if (res.affectedRows == 0) {
          // not found Customer with the id
          result({ kind: "not_found" }, null);
          return;
        }

        console.log("Deleted candidate with id: ", candidateID);
        result(null, res);
      });
    }
  })


}

module.exports = Candidate;
