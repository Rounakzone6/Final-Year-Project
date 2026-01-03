import express from "express";
import authSuper from "../middleware/authSuper.js";
import {
  cityList,
  addCity,
  editCity,
  removeCity,
  collegeInCity,
  hostelInCity,
  pgInCity,
  messInCity,
} from "../controller/cityController.js";

const cityRoute = express.Router();

cityRoute.get("/", cityList);
cityRoute.get("/:id/college", collegeInCity);
cityRoute.get("/:id/hostel", hostelInCity);
cityRoute.get("/:id/pg", pgInCity);
cityRoute.get("/:id/mess", messInCity);
cityRoute.delete("/delete/:id", authSuper, removeCity);
cityRoute.delete("/edit/:id", authSuper, editCity);
cityRoute.post("/add", authSuper, addCity);

export default cityRoute;
