import mongoose from "mongoose";
import FoodTruck from "./foodtruck";
let Schema = mongoose.Schema;

let ReviewSchema = new Schema({
  // specify validation for properties by using propertyName: { ... }
  title: {
    type: String,
    required: true
  },
  text: String,
  foodtruck: {
    type: Schema.Types.ObjectId, // stores ID of FoodTruck
    ref: "FoodTruck",
    required: true
  }
});

module.exports = mongoose.model("Review", ReviewSchema);
