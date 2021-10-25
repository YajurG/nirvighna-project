const express = require('express');
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.json({message: "Welcome."});
})

require("./routes/candidate.routes.js")(app);
require("./routes/location.routes.js")(app);
require("./routes/functions.routes.js")(app);
require("./routes/industries.routes.js")(app);
require("./routes/employers.routes.js")(app);


app.listen(8080, () => {
  console.log("Server running on port 8080!");
})
