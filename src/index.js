import http from "http"; // allows us to create server
import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose"; // ORM
import passport from "passport";
// Passport uses Strategys for the different auth methods
// LocalStrategy - for standard email and password registration/auth
// FacebookStrategy - for Facebook auth...
// GoogleStrategy - for Google auth...
const LocalStrategy = require("passport-local").Strategy;

// import statements look for index.js file to import
import config from "./config";
import routes from "./routes";

let app = express();
app.server = http.createServer(app);

// middleware
// parse application/json
app.use(bodyParser.json({
  limit: config.bodyLimit
}))

// passport config
app.use(passport.initialize());
let Account = require("./model/account");
passport.use(new LocalStrategy({
  usernameField: "email",
  passwordField: "password"
},
  Account.authenticate()
));
// passport needs to serializes and deserializes the user when they login
passport.serializeUser(Account.serializeUser());
passport.deserializeUser(Account.deserializeUser());

// api routes v1
app.use("/v1", routes);

app.server.listen(config.port);
// Tells us the port the server is actually running on
console.log(`Started on port ${app.server.address().port}`);

// exports app as default
export default app;
