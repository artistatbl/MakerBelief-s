const express = require("express")
const morgan = require('morgan')
const bodyParser = require("body-parser");
const cors = require("cors");


const app = express()
app.use(cors())


// Server port
const Port  =  process.env.PORT || 1000

// Start server
app.listen(Port, () => {
    console.log("Server running on port: " + Port)
});
//
// Logging
app.use(morgan('tiny'));

// Body parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Root endpoint
app.get("/", (req, res, next) => {
    res.json({ "status": "Alive" })
});

// Other API endpoints: Links go here...
require("./app/routes/task.routes")(app);
require("./app/routes/user.routes")(app);
//require("./app/routes/comments.server.routes")(app);
// Default response for any other request
app.use(function (req, res) {
    res.sendStatus(404);



});