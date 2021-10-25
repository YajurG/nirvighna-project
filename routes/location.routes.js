module.exports = app => {
    const locations = require("../controllers/location.controller.js");

    app.get("/cities", locations.getCities);
    app.get("/cities/:countryID", locations.getCitiesByCountryID);
    app.get("/cityByField", locations.getCityByField);

    app.get("/countries", locations.getCountries);
    app.get("/countryByField", locations.getCountryByField);
}
