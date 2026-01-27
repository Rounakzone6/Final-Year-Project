import express from "express";
import authAdmin from "../middleware/authAdmin.js";
import authSuper from "../middleware/authSuper.js";
import {
  hostelList,
  hostelDetails,
  addHostel,
  editHostel,
  removeHostel,
  verifyHostel,
  unverifyHostel,
} from "../controller/hostelController.js";

const hostelRoute = express.Router();

hostelRoute.get("/", hostelList);
hostelRoute.get("/:id", hostelDetails);
hostelRoute.post("/add", addHostel);
hostelRoute.patch("/update/:id", authAdmin, editHostel);
hostelRoute.patch("/verify/:id", authSuper, verifyHostel);
hostelRoute.patch("/unverify/:id", authSuper, unverifyHostel);
hostelRoute.delete("/delete/:id", authAdmin, removeHostel);

export default hostelRoute;
