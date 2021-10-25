module.exports = app => {
    const industries = require("../controllers/industries.controller.js");

    app.get("/industries", industries.getIndustries);
    app.get("/industryByField", industries.getIndustryByField);
    app.post("/industries/add", industries.addIndustry)
}
