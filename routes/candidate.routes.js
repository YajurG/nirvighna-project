module.exports = app => {
    const candidates = require("../controllers/candidate.controller.js");

    app.post("/candidates", candidates.create);

    app.get("/candidates", candidates.getCandidates);

    app.get("/candidatesByField", candidates.getCandidatesByField);

    app.get("/candidates/:candidateID", candidates.getByID);

    app.put("/candidates/:candidateID", candidates.updateByID);

    app.delete("/candidates/:candidateID", candidates.delete)

}
