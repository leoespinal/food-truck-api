import mongoose from "mongoose";
import config from "./config";

// Connects to database and passes DB to callback
export default callback => {
  mongoose.promise = global.promise; // tells mongoose what promise library to use
  let db = mongoose.connect(config.mongoUrl);
  callback(db);
}
