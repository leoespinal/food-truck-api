import mongoose from "mongoose";
import { Router } from "express";
import FoodTruck from "../model/foodtruck";
import Review from "../model/review";

// imports authentication from middleware so that users cant access
// certain endpoints without having been authenticated
import { authenticate } from "../middleware/authMiddleware";

export default({ config, db }) => {
  let api = Router();

  // CRUD - Create, Read, Update, Delete

  // "/v1/foodtruck/add" - Create
  // passing in 'authenticate' function makes this route locked down so that auth is required
  api.post("/add", authenticate, (req, res) => {
    // Create new foodtruck object
    let newFoodTruck = new FoodTruck();
    // Set object properties
    newFoodTruck.name = req.body.name;
    newFoodTruck.foodType = req.body.foodType;
    newFoodTruck.avgCost = req.body.avgCost;
    newFoodTruck.geometry.coordinates = req.body.geometry.coordinates;

    // Save to DB - via mongoose model
    newFoodTruck.save(err => {
      if(err) {
        res.send(err);
      }
      res.json({ message: "Food truck saved successfully"});
    });
  });

  // "/v1/foodtruck" - Read
  api.get("/", (req, res) => {
    // find({}) - means find everything
    FoodTruck.find({}, (err, foodtrucks) => {
      if (err) {
        res.send(err);
      }
      res.json(foodtrucks);
    });
  });

  // "/v1/foodtruck/:id" - Read
  api.get("/:id", (req, res) => {
    FoodTruck.findById(req.params.id, (err, foodtruck) => {
      if (err) {
        res.send(err);
      }
      res.json(foodtruck);
    });
  });

  // "/v1/foodtruck/:id" - Update
  api.put("/:id", (req, res) => {
    FoodTruck.findById(req.params.id, (err, foodtruck) => {
      if (err) {
        res.send(err);
      }
      foodtruck.name = req.body.name;
      foodtruck.foodType = req.body.foodType;
      foodtruck.avgCost = req.body.avgCost;
      foodtruck.geometry.coordinates = req.body.geometry.coordinates;

      foodtruck.save(err => {
        if (err) {
          res.send(err);
        }
        res.json({ message: "Food truck was updated successfully"});
      });
    });
  });

  // "/v1/foodtruck/:id" - Delete // TODO: Fix this endpoint
  api.delete("/:id", (req, res) => {
    FoodTruck.remove({
      _id: req.params.id
    }, (err, foodtruck) => {
      if (err) {
        res.send(err);
      }
      Review.remove({
        foodtruck: req.params.id
      }, (err, review) => {
        if (err) {
          res.send(err);
        }
        res.json({message: "Food Truck and associated Reviews successfully deleted"});
      });

    });
  });

  // add review for a specific foodtruck id
  // "/v1/foodtruck/reviews/add/:id"
  api.post("/reviews/add/:id", (req, res) => {
    FoodTruck.findById(req.params.id, (err, foodtruck) => {
      if (err) {
        res.send(err);
      }
      let newReview = new Review();
      newReview.title = req.body.title;
      newReview.text = req.body.text;
      newReview.foodtruck = foodtruck._id;

      newReview.save((err, review) => {
        if (err) {
          res.send(err);
        }
        foodtruck.reviews.push(review);
        foodtruck.save(err => {
          if (err) {
            res.send(err);
          }
          res.json({ message: "Food truck review saved"})
        });
      });
    });
  });

  // get reviews for a specific food truck id
  // "/v1/foodtruck/reviews/:id"
  api.get("/reviews/:id", (req, res) => {
    Review.find({foodtruck: req.params.id}, (err, reviews) => {
      if (err) {
        res.send(err);
      }
      res.json(reviews);
    });
  });

  return api;
}
