import mongoose from "mongoose";
import Review from "./review";
let Schema = mongoose.Schema; // blue print for data model you are going to use

// Can add validation in schema
let FoodTruckSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  foodType: {
    type: String,
    required: true
  },
  avgCost: Number,
  geometry: {
    type: { type: String, default: "Point" }, // default, allows for default value for type
    coordinates: {
      "lat": Number,
      "long": Number
    }
  },
  reviews: [{type: Schema.Types.ObjectId, ref: "Review"}]
});

// Exports model
module.exports = mongoose.model("FoodTruck", FoodTruckSchema);
