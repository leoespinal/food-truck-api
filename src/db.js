import mongoose from "mongoose";
import config from "./config";

// Connects to database and passes DB to callback
export default callback => {
  let db = mongoose.connect(config.mongoUrl);
  callback(db);
}
