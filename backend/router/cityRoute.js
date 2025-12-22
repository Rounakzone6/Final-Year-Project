import express from "express";
import {
  addCity,
  cityList,
  removeCity,
  collegeInCity,
  hostelInCity,
  pgInCity,
  messInCity,
} from "../controller/cityController.js";
import authSuper from "../middleware/authSuper.js";

const cityRoute = express.Router();

cityRoute.get("/", cityList);
cityRoute.get("/:id/college", collegeInCity);
cityRoute.get("/:id/hostel", hostelInCity);
cityRoute.get("/:id/pg", pgInCity);
cityRoute.get("/:id/mess", messInCity);
cityRoute.delete("/delete/:id", authSuper, removeCity);
cityRoute.post("/add", authSuper, addCity);

export default cityRoute;
