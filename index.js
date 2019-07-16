const express = require("express");
const bodyParser = require("body-parser");
const db = require("./models");
const MovieController = require("./controllers/movie");
const MoviePresenter = require("./presenters/movie");

const app = express();
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));

MovieController(app, db, MoviePresenter);

module.exports = app;

app.listen(8080, () => console.log("App listening on port 8080!"));
