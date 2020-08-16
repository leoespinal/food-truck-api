import express from "express";
import config from "../config";
import middleware from "../middleware";
import initialzeDb from "../db";
import foodtruck from "../controller/foodtruck";
import account from "../controller/account";

let router = express();
// connect to db
initialzeDb(db => {
  // internal middleware
  router.use(middleware({ config, db }));
  // api routes v1 (/v1)
  // foodtruck - is a controller for the foodtruck api
  router.use("/foodtruck", foodtruck({ config, db }));
  router.use("/account", account({ config, db }));
});

export default router;
