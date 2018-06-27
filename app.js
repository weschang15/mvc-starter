const express = require("express");
const session = require("express-session");
const cookieParser = require("cookie-parser");
//= require session store
const app = express();

// Custom modules
const { apiErrorHandler } = require("./middlewares");
const api = require("./routes/api");

// Allow application to set cookies with req.cookies
app.use(cookieParser());

//= configure store options
//= create new session store

// Create a session for each visitor to track logged in users from request to request
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    key: process.env.SESSION_KEY,
    resave: false,
    saveUninitialized: false,
    store: sessionStore
  })
);

// Takes the raw requests and turns them into usable properties on req.body
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true
  })
);

// Configure application to use our custom routing
app.use("/api/v1/test", api.testRoutes);

// Configure application to use custom middleware
app.use(apiErrorHandler);

module.exports = app;
