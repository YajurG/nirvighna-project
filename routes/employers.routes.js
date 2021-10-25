module.exports = app => {
    const employers = require("../controllers/employers.controller.js");

    app.get("/employers", employers.getEmployers);
    app.get("/employerByField", employers.getEmployerByField);
    app.put("/updateEmployer/:employerID", employers.updateEmployerByID);
    app.post("/employers", employers.addEmployer);
}
