require("dotenv").config();
require("./models/connection");

var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
const exercisesRouter = require("./routes/exercises");
const hystoryRouter = require("./routes/hystory");
const usersWorkoutsRouter = require("./routes/usersWorkouts");
const workoutsLibrary = require("./routes/workoutsLibrary");

var app = express();

const cors = require("cors");
app.use(cors());

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/exercises", exercisesRouter);
app.use("/hystory", hystoryRouter);
app.use("/usersWokouts", usersWorkoutsRouter);
app.use("/workoutsLibrary", workoutsLibrary);

module.exports = app;
