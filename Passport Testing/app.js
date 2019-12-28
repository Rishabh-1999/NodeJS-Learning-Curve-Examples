const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const path = require("path");
var session = require("express-session");
const flash = require("connect-flash");
const passport = require("passport")

const app = express();

// Passport Config
require('./config/passport')(passport);

var mongoose = require("mongoose");
var mongoDB = "mongodb://localhost/passporttesting";
mongoose
  .connect(mongoDB, {
    useNewUrlParser: true
  })
  .then(() => console.log("DB Connected"))
  .catch(err => console.log(err));

// EJS
app.use(expressLayouts);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

/* Session */
app.use(
  session({
    secret: "adcsdcsdcsdcvdfvdfv",
    resave: true,
    saveUninitialized: false
  })
);

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// connect flash
app.use(flash());

// BodyParser
app.use(
  express.urlencoded({
    extended: false
  })
);

// Global vars
app.use((req, res, next) => {
  res.locals.success_msg = req.flash("success_msg");
  res.locals.error_msg = req.flash("error_msg");
  next();
});

//Routes
app.use("/", require("./routes/index"));
app.use("/users", require("./routes/users"));

const PORT = process.env.PORT || 3000;

app.listen(PORT, console.log("Server satrted at " + PORT));