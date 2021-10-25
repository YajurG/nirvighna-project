module.exports = app => {
    const functions = require("../controllers/functions.controller.js");

    app.get("/functions", functions.getFunctions);
    app.get("/functionByField", functions.getFunctionByField);
    app.post("/functions/add", functions.addFunction);
}
