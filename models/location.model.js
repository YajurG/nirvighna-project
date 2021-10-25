var getConnection = require('./db.connection.js');

exports.getCities = (limit, result) => {
    getConnection((err, connection) => {
      if (err) {
        console.log(err)
        result(err, null);
        return;
      } else {
        connection.query("SELECT * FROM cities LIMIT ?", limit, (err, res) => {
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


exports.getCityByField = (fields, values, result) => {
  getConnection((err, connection) => {
    if (err) {
      console.log(err);
      result(err, null);
      return;
    } else {
      let query = "SELECT * FROM cities WHERE (??) IN (?)";
      let parameters = [];
      parameters.push(fields[0]);
      parameters.push(values[0]);
      for (let i = 1; i < fields.length; i++){
        query += " AND (??) IN (?)";
        parameters.push(fields[i], values[i]);
      }
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
        console.log("Record not found");
        console.log(res);
        result({kind: "not_found"}, null);
      })
    }
  })
}

exports.getCitiesByCountryID = (countryID, result) => {
    getConnection((err, connection) => {
      if (err) {
        console.log(err);
        result(err, null);
        return;
      } else {
        connection.query("SELECT * FROM cities where country_id = ?", countryID, (err, res) => {
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

exports.getCountries = (limit, result) => {
    getConnection((err, connection) => {
      if (err) {
        console.log(err)
        result(err, null);
        return;
      } else {
        connection.query("SELECT * FROM countries LIMIT ?", limit, (err, res) => {
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

exports.getCountryByField = (fields, values, result) => {
  getConnection((err, connection) => {
    if (err) {
      console.log(err);
      result(err, null);
      return;
    } else {
      let query = "SELECT * FROM countries WHERE (??) IN (?)";
      let parameters = [];
      parameters.push(fields[0]);
      parameters.push(values[0]);
      for (let i = 1; i < fields.length; i++){
        query += " AND (??) IN (?)";
        parameters.push(fields[i], values[i]);
      }
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
        console.log("Record not found");
        console.log(res);
        result({kind: "not_found"}, null);
      })
    }
  })
}

exports.getCityID = (names, result) => {
    getConnection((err, connection) => {
      if (err) {
        console.log(err);
        result(err, null);
        return;
      } else {
        let options = names.name;
        connection.query("SELECT * FROM cities where city IN (?)", [options], (err, res) => {
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
