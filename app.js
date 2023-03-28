var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
require("dotenv").config();

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var usersStaff = require("./routes/staff");
var customerRouter = require("./routes/customer");
var usersFilm = require("./routes/film");

var app = express();

app.use(logger("dev"));
app.use(express.json());

app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/customer", customerRouter);
app.use("/api", usersStaff);
/* app.use("/api", usersStaff); */
app.use("/api", usersFilm);

module.exports = app;
