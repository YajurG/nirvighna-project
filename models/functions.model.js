var getConnection = require('./db.connection.js');

exports.getFunctions = (limit, result) => {
    getConnection((err, connection) => {
      if (err) {
        console.log(err)
        result(err, null);
        return;
      } else {
        connection.query("SELECT * FROM functions LIMIT ?", limit, (err, res) => {
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

exports.getFunctionByField = (queryParams, result) => {
  getConnection((err, connection) => {
    if (err) {
      console.log(err);
      result(err, null);
      return;
    } else {
      let query = "SELECT * FROM functions WHERE ?? = ?";
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

        console.log("Function not found");
        console.log(res);
        result({kind: "not_found"}, null);
      })
    }
  })
}

exports.addFunction = (queryParams, result) => {
  getConnection((err, connection) => {
    if (err){
      console.log(err);
      result(err, null);
      return;
    } else {
      connection.query("INSERT INTO functions SET ?", queryParams, (err, res) => {
        connection.release();
        if (err) {
          console.log("error: ", err);
          result(err, null);
          return;
        }
        result(null, {id: res.insertId, ...queryParams}); 
      })
    }
  })
}
