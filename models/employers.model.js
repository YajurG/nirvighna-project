var getConnection = require('./db.connection.js');

exports.getEmployers = (limit, result) => {
  getConnection((err, connection) => {
    if (err) {
      console.log(err)
      result(err, null);
      return;
    } else {
      connection.query("SELECT * FROM employers LIMIT ?", limit, (err, res) => {
        connection.release();
        if (err) {
          console.log(err)
          result(err, null)
          return;
        }
        result(null, res);
      })
    }
  })
}

exports.getEmployerByField = (queryParams, result) => {
  getConnection((err, connection) => {
    if (err) {
      console.log(err);
      result(err, null);
      return;
    } else {
      let query = "SELECT * FROM employers WHERE ?? = ?";
      let parameters = [];
      for (var key in queryParams) {
        parameters.push(key, queryParams[key]);
      }
      for (var i = 1; i < Object.keys(queryParams).length; i++){
        query += " AND ?? = ?";
      }
      connection.query(query, parameters, (err, res) => {
        connection.release();
        if (err) {
          console.log("error: ", err);
          result(err, null);
          return;
        }

        if (res.length){
          result(null, res);
          return;
        }

        console.log("Employer not found");
        console.log(res);
        result({kind: "not_found"}, null);
      })
    }
  })
}

exports.updateByID = (id, update, result) => {
  getConnection((err, connection) => {
    if (err) {
      console.log(err);
      result(err, null);
      return;
    } else {
      let query = "UPDATE employers SET ?? = ?";
      let parameters = [];
      for (var key in update) {
        parameters.push(key, update[key]);
      }

      for (let i = 1; i < Object.keys(update).length; i++){
        query += ", ?? = ?";
      }
      query += " WHERE id = ?";
      parameters.push(id);
      connection.query(query, parameters, (err, res) => {
        connection.release();
        if (err) {
          console.log("error: ", err);
          result(err, null);
          return;
        }

        if (res.affectedRows == 0) {
          console.log("No rows found");
          result({ kind: "not_found" }, null);
          return;
        }
        let data = {data: {id: id, ...update}};
        result(null, data);
      })
    }
  })
}

exports.addEmployer = (newEmployer, result) => {
  getConnection((err, connection) => {
    if (err) {
      console.log(err);
      result(err, null);
      return;
    } else {
      connection.query("INSERT INTO employers SET ?", newEmployer, (err, res) => {
        connection.release();
        if (err) {
          console.log("error: " + err);
          result(err, null);
          return;
        }
        result(null, {id: res.insertId, ...newEmployer});
      })
    }
  })
}
