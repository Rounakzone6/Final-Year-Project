import express from "express";
import authAdmin from "../middleware/authAdmin.js";
import {
  hostelList,
  hostelDetails,
  addHostel,
  editHostel,
  removeHostel,
} from "../controller/hostelController.js";

const hostelRoute = express.Router();

hostelRoute.get("/", hostelList);
hostelRoute.get("/:id", hostelDetails);
hostelRoute.post("/add", addHostel);
hostelRoute.patch("/update/:id", authAdmin, editHostel);
hostelRoute.delete("/delete/:id", authAdmin, removeHostel);

export default hostelRoute;
