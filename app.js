const express = require("express");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const MySQLStore = require("express-mysql-session")(session);
const app = express();

// Custom modules
const { apiErrorHandler } = require("./middlewares");
const api = require("./routes/api");

// Allow application to set cookies with req.cookies
app.use(cookieParser());

// Configure options for MYSQL session store
const options = {
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE
};

// Register MYSQL database table to store server sessions
const sessionStore = new MySQLStore(options);

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
